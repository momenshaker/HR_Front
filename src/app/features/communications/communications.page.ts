import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';
import {
  CommunicationsApiService,
  ListAnnouncementsResponse
} from '../../api/communications/communications.api';
import { SnackbarService } from '../../shared/services/snackbar';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-communications-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LoadingStateComponent,
    EmptyStateComponent
  ],
  template: `
    <section class="communications-grid">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Announcements</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-container *ngIf="!loading(); else loadingTpl">
            <mat-list *ngIf="announcements().length; else emptyTpl">
              <mat-list-item *ngFor="let announcement of announcements()">
                <div matListItemTitle>{{ announcement.title }}</div>
                <div matListItemLine>{{ announcement.publishedAt | date: 'medium' }}</div>
              </mat-list-item>
            </mat-list>
          </ng-container>
          <ng-template #loadingTpl>
            <app-loading-state [loading]="true"></app-loading-state>
          </ng-template>
          <ng-template #emptyTpl>
            <app-empty-state message="No announcements yet"></app-empty-state>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Publish announcement</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="publishForm" class="form-grid" (ngSubmit)="publish()">
            <mat-form-field appearance="fill">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" required />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Body</mat-label>
              <textarea matInput rows="4" formControlName="body"></textarea>
            </mat-form-field>
            <button mat-flat-button color="primary" [disabled]="publishForm.invalid || publishing()">
              {{ publishing() ? 'Publishing…' : 'Publish' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .communications-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }
      .form-grid {
        display: grid;
        gap: 16px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunicationsPageComponent {
  private readonly api = inject(CommunicationsApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly announcements = signal<ListAnnouncementsResponse['data']>([]);
  protected readonly loading = signal(false);
  protected readonly publishing = signal(false);

  readonly publishForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  });

  constructor() {
    this.loadAnnouncements();
  }

  private loadAnnouncements(): void {
    this.loading.set(true);
    this.api
      .listAnnouncements()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.announcements.set(response.data),
        error: () => this.snackbar.error('Failed to load announcements')
      });
  }

  publish(): void {
    if (this.publishForm.invalid || this.publishing()) {
      return;
    }
    this.publishing.set(true);
    const body = this.publishForm.getRawValue();
    this.api
      .publishAnnouncement({ body })
      .pipe(finalize(() => this.publishing.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Announcement published');
          this.publishForm.reset();
          this.loadAnnouncements();
        },
        error: () => this.snackbar.error('Failed to publish announcement')
      });
  }
}
