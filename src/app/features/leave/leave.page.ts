import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { LeaveApiService, ListLeaveBalancesResponse, RequestLeaveRequest } from '../../api/leave/leave.api';
import { SnackbarService } from '../../shared/services/snackbar';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-leave-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingStateComponent,
    EmptyStateComponent
  ],
  template: `
    <section class="leave-grid">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Balance</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-container *ngIf="!loading(); else loadingTpl">
            <div class="balance" *ngIf="balances(); else empty">
              <div>
                <h3>Vacation</h3>
                <p>{{ balances()!.vacation }} days</p>
              </div>
              <div>
                <h3>Sick</h3>
                <p>{{ balances()!.sick }} days</p>
              </div>
            </div>
          </ng-container>
          <ng-template #loadingTpl>
            <app-loading-state [loading]="true"></app-loading-state>
          </ng-template>
          <ng-template #empty>
            <app-empty-state message="No balance data available"></app-empty-state>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Request leave</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="requestForm" class="form-grid" (ngSubmit)="requestLeave()">
            <mat-form-field appearance="fill">
              <mat-label>Type</mat-label>
              <input matInput formControlName="type" required placeholder="VACATION" />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Start date</mat-label>
              <input matInput type="date" formControlName="startDate" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>End date</mat-label>
              <input matInput type="date" formControlName="endDate" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Reason</mat-label>
              <textarea matInput rows="3" formControlName="reason"></textarea>
            </mat-form-field>
            <button mat-flat-button color="primary" [disabled]="requestForm.invalid || requesting()">
              {{ requesting() ? 'Submitting…' : 'Submit request' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Manager decision</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="approvalForm" class="form-grid" (ngSubmit)="approveLeave()">
            <mat-form-field appearance="fill">
              <mat-label>Request ID</mat-label>
              <input matInput type="number" formControlName="requestId" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Comment</mat-label>
              <textarea matInput rows="3" formControlName="comment"></textarea>
            </mat-form-field>
            <button mat-flat-button color="accent" [disabled]="approvalForm.invalid || approving()">
              {{ approving() ? 'Processing…' : 'Approve request' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .leave-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }
      .balance {
        display: flex;
        gap: 24px;
      }
      .form-grid {
        display: grid;
        gap: 16px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeavePageComponent {
  private readonly api = inject(LeaveApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly balances = signal<ListLeaveBalancesResponse | null>(null);
  protected readonly loading = signal(false);
  protected readonly requesting = signal(false);
  protected readonly approving = signal(false);

  readonly requestForm = this.fb.nonNullable.group({
    type: ['VACATION' as RequestLeaveRequest['type'], Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    reason: ['']
  });

  readonly approvalForm = this.fb.nonNullable.group({
    requestId: [0, Validators.required],
    comment: ['Enjoy!']
  });

  constructor() {
    this.loadBalances();
  }

  private loadBalances(): void {
    this.loading.set(true);
    this.api
      .listLeaveBalances()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.balances.set(response),
        error: () => this.snackbar.error('Failed to load balances')
      });
  }

  requestLeave(): void {
    if (this.requestForm.invalid || this.requesting()) {
      return;
    }
    this.requesting.set(true);
    const body = this.requestForm.getRawValue() as RequestLeaveRequest;
    this.api
      .requestLeave({ body })
      .pipe(finalize(() => this.requesting.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Leave request submitted');
          this.loadBalances();
        },
        error: () => this.snackbar.error('Failed to submit request')
      });
  }

  approveLeave(): void {
    if (this.approvalForm.invalid || this.approving()) {
      return;
    }
    this.approving.set(true);
    const body = {
      requestId: this.approvalForm.getRawValue().requestId,
      decision: 'APPROVED' as const,
      comment: this.approvalForm.getRawValue().comment
    };
    this.api
      .approveLeave({ body })
      .pipe(finalize(() => this.approving.set(false)))
      .subscribe({
        next: () => this.snackbar.success('Leave approved'),
        error: () => this.snackbar.error('Failed to approve leave')
      });
  }
}
