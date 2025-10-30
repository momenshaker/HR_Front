import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { finalize } from 'rxjs';
import {
  TimeAttendanceApiService,
  GetTimesheetResponse
} from '../../api/time-and-attendance/time-and-attendance.api';
import { TableShellComponent } from '../../shared/components/table-shell/table-shell.component';
import { SnackbarService } from '../../shared/services/snackbar';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';

@Component({
  selector: 'app-time-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    TableShellComponent,
    LoadingStateComponent
  ],
  template: `
    <section class="time-grid">
      <app-table-shell title="My Timesheet" subtitle="Week of {{ timesheet()?.weekStart | date }}">
        <ng-container *ngIf="!loading(); else loadingTpl">
          <table mat-table [dataSource]="timesheet()?.entries ?? []" class="mat-elevation-z1">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let entry">{{ entry.date | date }}</td>
            </ng-container>
            <ng-container matColumnDef="project">
              <th mat-header-cell *matHeaderCellDef>Project</th>
              <td mat-cell *matCellDef="let entry">{{ entry.project }}</td>
            </ng-container>
            <ng-container matColumnDef="hours">
              <th mat-header-cell *matHeaderCellDef>Hours</th>
              <td mat-cell *matCellDef="let entry">{{ entry.hours }}</td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let entry">{{ entry.status }}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </ng-container>
        <ng-template #loadingTpl>
          <app-loading-state [loading]="true"></app-loading-state>
        </ng-template>
      </app-table-shell>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Add time entry</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="entryForm" class="form-grid" (ngSubmit)="addEntry()">
            <mat-form-field appearance="fill">
              <mat-label>Date</mat-label>
              <input matInput type="date" formControlName="date" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Project</mat-label>
              <input matInput formControlName="project" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Hours</mat-label>
              <input matInput type="number" min="0" formControlName="hours" required />
            </mat-form-field>
            <button mat-flat-button color="primary" [disabled]="entryForm.invalid || creating()">
              {{ creating() ? 'Saving…' : 'Add entry' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Submit timesheet</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form class="form-grid" [formGroup]="submitForm" (ngSubmit)="submitTimesheet()">
            <mat-form-field appearance="fill">
              <mat-label>Week start</mat-label>
              <input matInput type="date" formControlName="weekStart" required />
            </mat-form-field>
            <div class="entries-preview">
              <p>Entries to submit: {{ submitEntries.length }}</p>
            </div>
            <button mat-flat-button color="primary" [disabled]="submitForm.invalid || submitting()">
              {{ submitting() ? 'Submitting…' : 'Submit for approval' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Manager approval</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form class="form-grid" [formGroup]="approvalForm" (ngSubmit)="approveTimesheet()">
            <mat-form-field appearance="fill">
              <mat-label>Timesheet ID</mat-label>
              <input matInput type="number" formControlName="timesheetId" required />
            </mat-form-field>
            <button mat-flat-button color="accent" [disabled]="approvalForm.invalid || approving()">
              {{ approving() ? 'Approving…' : 'Approve' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .time-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
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
export class TimePageComponent implements OnInit {
  private readonly api = inject(TimeAttendanceApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly displayedColumns = ['date', 'project', 'hours', 'status'];
  protected readonly timesheet = signal<GetTimesheetResponse | null>(null);
  protected readonly loading = signal(false);
  protected readonly creating = signal(false);
  protected readonly submitting = signal(false);
  protected readonly approving = signal(false);

  readonly entryForm = this.fb.nonNullable.group({
    date: ['', Validators.required],
    project: ['', Validators.required],
    hours: [8, [Validators.required, Validators.min(0)]]
  });

  readonly submitForm = this.fb.nonNullable.group({
    weekStart: ['', Validators.required]
  });

  readonly approvalForm = this.fb.nonNullable.group({
    timesheetId: [0, Validators.required]
  });

  readonly submitEntries: { date: string; project: string; hours: number }[] = [];

  ngOnInit(): void {
    this.loadTimesheet();
  }

  private loadTimesheet(): void {
    this.loading.set(true);
    this.api
      .getTimesheet()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.timesheet.set(response);
          this.submitForm.patchValue({ weekStart: response.weekStart });
        },
        error: () => this.snackbar.error('Failed to load timesheet')
      });
  }

  addEntry(): void {
    if (this.entryForm.invalid || this.creating()) {
      return;
    }
    this.creating.set(true);
    const body = this.entryForm.getRawValue();
    this.api
      .createTimeEntry({ body })
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Entry created');
          this.submitEntries.push(body);
          this.loadTimesheet();
          this.entryForm.reset({ date: '', project: '', hours: 8 });
        },
        error: () => this.snackbar.error('Failed to create entry')
      });
  }

  submitTimesheet(): void {
    if (this.submitForm.invalid || this.submitting()) {
      return;
    }
    this.submitting.set(true);
    const body = {
      weekStart: this.submitForm.getRawValue().weekStart,
      entries: this.submitEntries.length
        ? this.submitEntries
        : this.timesheet()?.entries.map((entry) => ({
            date: entry.date,
            hours: entry.hours,
            project: entry.project
          })) ?? []
    };
    this.api
      .submitTimesheet({ body })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Timesheet submitted');
          this.submitEntries.length = 0;
          this.loadTimesheet();
        },
        error: () => this.snackbar.error('Failed to submit timesheet')
      });
  }

  approveTimesheet(): void {
    if (this.approvalForm.invalid || this.approving()) {
      return;
    }
    this.approving.set(true);
    const body = {
      timesheetId: this.approvalForm.getRawValue().timesheetId,
      decision: 'APPROVED' as const
    };
    this.api
      .approveTimesheet({ body })
      .pipe(finalize(() => this.approving.set(false)))
      .subscribe({
        next: () => this.snackbar.success('Timesheet approved'),
        error: () => this.snackbar.error('Failed to approve timesheet')
      });
  }
}
