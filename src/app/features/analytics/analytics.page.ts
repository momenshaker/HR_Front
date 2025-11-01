import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { finalize } from 'rxjs';
import { AnalyticsApiService } from '../../api';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { SnackbarService } from '../../shared/services/snackbar';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    LoadingStateComponent
  ],
  template: `
    <section class="analytics-grid">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Headcount</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-container *ngIf="!loadingHeadcount(); else loadingTpl">
            <h2>{{ headcount()?.total ?? 0 }} employees</h2>
            <mat-list>
              <mat-list-item *ngFor="let dept of headcount()?.departments ?? []">
                <div matListItemTitle>{{ dept.name }}</div>
                <div matListItemLine>{{ dept.headcount }} employees</div>
              </mat-list-item>
            </mat-list>
          </ng-container>
          <ng-template #loadingTpl>
            <app-loading-state [loading]="true"></app-loading-state>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Attrition</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="attritionForm" class="form-grid" (ngSubmit)="loadAttrition()">
            <mat-form-field appearance="fill">
              <mat-label>Year</mat-label>
              <input matInput type="number" formControlName="year" />
            </mat-form-field>
            <button mat-flat-button color="primary">Refresh</button>
          </form>
          <div class="attrition" *ngIf="attrition() as value">
            <h3>{{ (value.rate * 100) | number : '1.1-2' }}%</h3>
            <p>Attrition rate</p>
          </div>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .analytics-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }
      .form-grid {
        display: grid;
        gap: 16px;
      }
      .attrition {
        margin-top: 16px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsPageComponent implements OnInit {
  private readonly api = inject(AnalyticsApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly headcount = signal<any | null>(null);
  protected readonly loadingHeadcount = signal(false);
  protected readonly attrition = signal<any | null>(null);

  readonly attritionForm = this.fb.group({
    year: [2024]
  });

  ngOnInit(): void {
    this.loadHeadcount();
    this.loadAttrition();
  }

  private loadHeadcount(): void {
    this.loadingHeadcount.set(true);
    this.api
      .getApiAnalyticsHeadcount()
      .pipe(finalize(() => this.loadingHeadcount.set(false)))
      .subscribe({
        next: (response) => {
          // Try to normalize into { total, departments: [{ name, headcount }] }
          const items: any[] = (response as any)?.Items ?? (response as any)?.departments ?? [];
          const total = (response as any)?.total ?? items.reduce((acc, it) => acc + (it.Count ?? it.headcount ?? 0), 0);
          const departments = items.map((it: any) => ({ name: it.DepartmentName ?? it.name, headcount: it.Count ?? it.headcount ?? 0 }));
          this.headcount.set({ total, departments });
        },
        error: () => this.snackbar.error('Failed to load headcount summary')
      });
  }

  loadAttrition(): void {
    const year = this.attritionForm.getRawValue().year;
    this.api
      .getApiAnalyticsLeaveUsage({ query: { year: year ?? undefined } })
      .subscribe({
        next: (response) => this.attrition.set(response as any),
        error: () => this.snackbar.error('Failed to load attrition data')
      });
  }
}
