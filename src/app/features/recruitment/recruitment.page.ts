import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';
import {
  RecruitmentApiService,
  ListCandidatesResponse
} from '../../api/recruitment/recruitment.api';
import { SnackbarService } from '../../shared/services/snackbar';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-recruitment-page',
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
    <section class="recruitment-grid">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Candidates</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="filterForm" class="filters" (ngSubmit)="loadCandidates()">
            <mat-form-field appearance="fill">
              <mat-label>Stage</mat-label>
              <input matInput formControlName="stage" placeholder="SCREENING" />
            </mat-form-field>
            <button mat-stroked-button color="primary">Filter</button>
          </form>

          <ng-container *ngIf="!loading(); else loadingTpl">
            <table mat-table [dataSource]="candidates()" class="mat-elevation-z1" *ngIf="candidates().length; else emptyTpl">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Name</th>
                <td mat-cell *matCellDef="let candidate">{{ candidate.name }}</td>
              </ng-container>
              <ng-container matColumnDef="role">
                <th mat-header-cell *matHeaderCellDef>Role</th>
                <td mat-cell *matCellDef="let candidate">{{ candidate.role }}</td>
              </ng-container>
              <ng-container matColumnDef="stage">
                <th mat-header-cell *matHeaderCellDef>Stage</th>
                <td mat-cell *matCellDef="let candidate">{{ candidate.stage }}</td>
              </ng-container>
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let candidate">
                  <button mat-button color="primary" (click)="advanceCandidate(candidate)">
                    Advance to interview
                  </button>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="columns"></tr>
              <tr mat-row *matRowDef="let row; columns: columns"></tr>
            </table>
          </ng-container>
          <ng-template #loadingTpl>
            <app-loading-state [loading]="true"></app-loading-state>
          </ng-template>
          <ng-template #emptyTpl>
            <app-empty-state message="No candidates available"></app-empty-state>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .recruitment-grid {
        display: grid;
        gap: 24px;
      }
      .filters {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 16px;
      }
      table {
        width: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecruitmentPageComponent {
  private readonly api = inject(RecruitmentApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly columns = ['name', 'role', 'stage', 'actions'];
  protected readonly candidates = signal<ListCandidatesResponse['data']>([]);
  protected readonly loading = signal(false);

  readonly filterForm = this.fb.group({
    stage: ['SCREENING']
  });

  constructor() {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.loading.set(true);
    const stage = this.filterForm.getRawValue().stage;
    this.api
      .listCandidates({ query: { stage: stage || undefined } })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.candidates.set(response.data),
        error: () => this.snackbar.error('Failed to load candidates')
      });
  }

  advanceCandidate(candidate: ListCandidatesResponse['data'][number]): void {
    this.api
      .advanceCandidate({ body: { candidateId: candidate.id, stage: 'INTERVIEW' } })
      .subscribe({
        next: () => {
          this.snackbar.success(`${candidate.name} advanced to interview`);
          this.loadCandidates();
        },
        error: () => this.snackbar.error('Failed to advance candidate')
      });
  }
}
