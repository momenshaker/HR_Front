import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';
import { PerformanceApiService, ListReviewsResponse } from '../../api/performance/performance.api';
import { SnackbarService } from '../../shared/services/snackbar';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-performance-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LoadingStateComponent,
    EmptyStateComponent
  ],
  template: `
    <section class="performance-grid">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Reviews</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-container *ngIf="!loading(); else loadingTpl">
            <table mat-table [dataSource]="reviews()" class="mat-elevation-z1" *ngIf="reviews().length; else emptyTpl">
              <ng-container matColumnDef="employee">
                <th mat-header-cell *matHeaderCellDef>Employee</th>
                <td mat-cell *matCellDef="let review">{{ review.employee }}</td>
              </ng-container>
              <ng-container matColumnDef="period">
                <th mat-header-cell *matHeaderCellDef>Period</th>
                <td mat-cell *matCellDef="let review">{{ review.period }}</td>
              </ng-container>
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let review">{{ review.status }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="columns"></tr>
              <tr mat-row *matRowDef="let row; columns: columns"></tr>
            </table>
          </ng-container>
          <ng-template #loadingTpl>
            <app-loading-state [loading]="true"></app-loading-state>
          </ng-template>
          <ng-template #emptyTpl>
            <app-empty-state message="No active reviews"></app-empty-state>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Submit review</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="reviewForm" class="form-grid" (ngSubmit)="submitReview()">
            <mat-form-field appearance="fill">
              <mat-label>Review ID</mat-label>
              <input matInput type="number" formControlName="reviewId" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Teamwork score</mat-label>
              <input matInput type="number" formControlName="teamwork" min="1" max="5" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Delivery score</mat-label>
              <input matInput type="number" formControlName="delivery" min="1" max="5" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Summary</mat-label>
              <textarea matInput rows="3" formControlName="summary"></textarea>
            </mat-form-field>
            <button mat-flat-button color="primary" [disabled]="reviewForm.invalid || submitting()">
              {{ submitting() ? 'Submitting…' : 'Submit review' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .performance-grid {
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformancePageComponent {
  private readonly api = inject(PerformanceApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly columns = ['employee', 'period', 'status'];
  protected readonly reviews = signal<ListReviewsResponse['data']>([]);
  protected readonly loading = signal(false);
  protected readonly submitting = signal(false);

  readonly reviewForm = this.fb.nonNullable.group({
    reviewId: [0, Validators.required],
    teamwork: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    delivery: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    summary: ['']
  });

  constructor() {
    this.loadReviews();
  }

  private loadReviews(): void {
    this.loading.set(true);
    this.api
      .listReviews()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.reviews.set(response.data),
        error: () => this.snackbar.error('Failed to load reviews')
      });
  }

  submitReview(): void {
    if (this.reviewForm.invalid || this.submitting()) {
      return;
    }
    this.submitting.set(true);
    const body = {
      reviewId: this.reviewForm.getRawValue().reviewId,
      scores: {
        teamwork: this.reviewForm.getRawValue().teamwork,
        delivery: this.reviewForm.getRawValue().delivery
      },
      summary: this.reviewForm.getRawValue().summary
    };
    this.api
      .submitReview({ body })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Review submitted');
          this.loadReviews();
        },
        error: () => this.snackbar.error('Failed to submit review')
      });
  }
}
