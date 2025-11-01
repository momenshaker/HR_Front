import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';
import { TrainingApiService } from '../../api';
import { SnackbarService } from '../../shared/services/snackbar';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-training-page',
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
    <section class="training-grid">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Courses</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-container *ngIf="!loading(); else loadingTpl">
            <table mat-table [dataSource]="courses()" class="mat-elevation-z1" *ngIf="courses().length; else emptyTpl">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Title</th>
                <td mat-cell *matCellDef="let course">{{ course.title }}</td>
              </ng-container>
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let course">{{ course.status }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="columns"></tr>
              <tr mat-row *matRowDef="let row; columns: columns"></tr>
            </table>
          </ng-container>
          <ng-template #loadingTpl>
            <app-loading-state [loading]="true"></app-loading-state>
          </ng-template>
          <ng-template #emptyTpl>
            <app-empty-state message="No courses available"></app-empty-state>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Enroll</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="enrollForm" class="form-grid" (ngSubmit)="enroll()">
            <mat-form-field appearance="fill">
              <mat-label>Course ID</mat-label>
              <input matInput type="number" formControlName="courseId" required />
            </mat-form-field>
            <button mat-flat-button color="primary" [disabled]="enrollForm.invalid || enrolling()">
              {{ enrolling() ? 'Enrolling…' : 'Enroll now' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .training-grid {
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
export class TrainingPageComponent implements OnInit {
  private readonly api = inject(TrainingApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly columns = ['title', 'status'];
  protected readonly courses = signal<any[]>([]);
  protected readonly loading = signal(false);
  protected readonly enrolling = signal(false);

  readonly enrollForm = this.fb.nonNullable.group({
    courseId: [0, Validators.required]
  });

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.loading.set(true);
    this.api
      .getApiTrainingCourses()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const items = (response as any)?.Items ?? (response as any)?.data ?? [];
          this.courses.set(items);
        },
        error: () => this.snackbar.error('Failed to load courses')
      });
  }

  enroll(): void {
    if (this.enrollForm.invalid || this.enrolling()) {
      return;
    }
    this.enrolling.set(true);
    const body = this.enrollForm.getRawValue();
    // best-effort enroll using session-based enroll endpoint if available
    const sessionId = (body as any).sessionId ?? (this.courses()[0]?.DefaultSessionId ?? 0);
    this.api
      .postApiTrainingSessionsSessionidEnroll({ pathParams: { sessionId }, query: {} })
      .pipe(finalize(() => this.enrolling.set(false)))
      .subscribe({
        next: () => this.snackbar.success('Enrollment confirmed'),
        error: () => this.snackbar.error('Failed to enroll')
      });
  }
}
