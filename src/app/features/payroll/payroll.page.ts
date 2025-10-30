import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import {
  PayrollApiService,
  ListPayrollRunsResponse,
  PreviewPayrollResponse
} from '../../api/payroll/payroll.api';
import { SnackbarService } from '../../shared/services/snackbar';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-payroll-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingStateComponent,
    EmptyStateComponent
  ],
  template: `
    <section class="payroll-grid">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Payroll runs</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-container *ngIf="!loadingRuns(); else loadingTpl">
            <table mat-table [dataSource]="runs()" class="mat-elevation-z1" *ngIf="runs().length; else emptyTpl">
              <ng-container matColumnDef="period">
                <th mat-header-cell *matHeaderCellDef>Period</th>
                <td mat-cell *matCellDef="let run">{{ run.period }}</td>
              </ng-container>
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let run">{{ run.status }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="runColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: runColumns"></tr>
            </table>
          </ng-container>
          <ng-template #loadingTpl>
            <app-loading-state [loading]="true"></app-loading-state>
          </ng-template>
          <ng-template #emptyTpl>
            <app-empty-state message="No payroll runs"></app-empty-state>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Preview payroll</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="previewForm" class="form-grid" (ngSubmit)="previewPayroll()">
            <mat-form-field appearance="fill">
              <mat-label>Period</mat-label>
              <input matInput formControlName="period" placeholder="2024-06" required />
            </mat-form-field>
            <button mat-flat-button color="primary" [disabled]="previewForm.invalid || previewing()">
              {{ previewing() ? 'Loading…' : 'Preview' }}
            </button>
          </form>
          <div class="preview" *ngIf="preview() as value">
            <h3>Summary</h3>
            <p>Gross: {{ value.summary.gross | number }}</p>
            <p>Net: {{ value.summary.net | number }}</p>
            <h3>Employees</h3>
            <ul>
              <li *ngFor="let row of value.employees">#{{ row.employeeId }} · {{ row.netPay | number }}</li>
            </ul>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Finalize payroll</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="finalizeForm" class="form-grid" (ngSubmit)="finalizePayroll()">
            <mat-form-field appearance="fill">
              <mat-label>Period</mat-label>
              <input matInput formControlName="period" required placeholder="2024-06" />
            </mat-form-field>
            <button mat-raised-button color="warn" [disabled]="finalizeForm.invalid || finalizing()">
              {{ finalizing() ? 'Posting…' : 'Finalize payroll' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .payroll-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }
      table {
        width: 100%;
      }
      .form-grid {
        display: grid;
        gap: 16px;
      }
      .preview {
        margin-top: 16px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollPageComponent implements OnInit {
  private readonly api = inject(PayrollApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly runColumns = ['period', 'status'];
  protected readonly runs = signal<ListPayrollRunsResponse['data']>([]);
  protected readonly loadingRuns = signal(false);
  protected readonly preview = signal<PreviewPayrollResponse | null>(null);
  protected readonly previewing = signal(false);
  protected readonly finalizing = signal(false);

  readonly previewForm = this.fb.nonNullable.group({
    period: ['', Validators.required]
  });

  readonly finalizeForm = this.fb.nonNullable.group({
    period: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadRuns();
  }

  private loadRuns(): void {
    this.loadingRuns.set(true);
    this.api
      .listPayrollRuns()
      .pipe(finalize(() => this.loadingRuns.set(false)))
      .subscribe({
        next: (response) => this.runs.set(response.data),
        error: () => this.snackbar.error('Failed to load payroll runs')
      });
  }

  previewPayroll(): void {
    if (this.previewForm.invalid || this.previewing()) {
      return;
    }
    this.previewing.set(true);
    const body = this.previewForm.getRawValue();
    this.api
      .previewPayroll({ body })
      .pipe(finalize(() => this.previewing.set(false)))
      .subscribe({
        next: (response) => this.preview.set(response),
        error: () => this.snackbar.error('Failed to preview payroll')
      });
  }

  finalizePayroll(): void {
    if (this.finalizeForm.invalid || this.finalizing()) {
      return;
    }
    const period = this.finalizeForm.getRawValue().period;
    if (!confirm(`Finalize payroll for ${period}?`)) {
      return;
    }
    this.finalizing.set(true);
    this.api
      .finalizePayroll({ body: { period, approve: true } })
      .pipe(finalize(() => this.finalizing.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Payroll finalized');
          this.loadRuns();
        },
        error: () => this.snackbar.error('Failed to finalize payroll')
      });
  }
}
