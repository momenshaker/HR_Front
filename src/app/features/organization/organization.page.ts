import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { OrganizationApiService, ListDepartmentsResponse } from '../../api/organization/organization.api';
import { SnackbarService } from '../../shared/services/snackbar';
import { TableShellComponent } from '../../shared/components/table-shell/table-shell.component';
import { FormShellComponent } from '../../shared/components/form-shell/form-shell.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-organization-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TableShellComponent,
    FormShellComponent,
    LoadingStateComponent,
    EmptyStateComponent
  ],
  template: `
    <section class="organization-grid">
      <app-table-shell title="Departments" subtitle="Manage organization units">
        <ng-container *ngIf="!loading(); else loadingTpl">
          <table mat-table [dataSource]="departments()" class="mat-elevation-z1" *ngIf="departments().length; else emptyTpl">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let department">{{ department.name }}</td>
            </ng-container>
            <ng-container matColumnDef="manager">
              <th mat-header-cell *matHeaderCellDef>Manager</th>
              <td mat-cell *matCellDef="let department">{{ department.manager }}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let department">
                <button mat-icon-button color="primary" (click)="editDepartment(department)">
                  <mat-icon>edit</mat-icon>
                </button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </ng-container>
        <ng-template #loadingTpl>
          <app-loading-state [loading]="true"></app-loading-state>
        </ng-template>
        <ng-template #emptyTpl>
          <app-empty-state message="No departments found"></app-empty-state>
        </ng-template>
      </app-table-shell>

      <app-form-shell [title]="selectedDepartment() ? 'Update Department' : 'Create Department'">
        <form [formGroup]="departmentForm" (ngSubmit)="saveDepartment()" class="form-grid">
          <mat-form-field appearance="fill">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" required />
            <mat-error *ngIf="departmentForm.controls.name.hasError('required')">Name is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Manager ID</mat-label>
            <input matInput type="number" formControlName="managerId" required />
            <mat-error *ngIf="departmentForm.controls.managerId.hasError('required')">
              Manager is required
            </mat-error>
          </mat-form-field>

          <div class="actions">
            <button mat-flat-button color="primary" [disabled]="departmentForm.invalid || saving()">
              {{ saving() ? 'Saving…' : (selectedDepartment() ? 'Update' : 'Create') }}
            </button>
            <button mat-button type="button" (click)="resetForm()" *ngIf="selectedDepartment()">
              Cancel
            </button>
          </div>
        </form>
      </app-form-shell>
    </section>
  `,
  styles: [
    `
      .organization-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: 2fr 1fr;
      }
      table {
        width: 100%;
      }
      .form-grid {
        display: grid;
        gap: 16px;
      }
      .actions {
        display: flex;
        gap: 12px;
      }
      @media (max-width: 1024px) {
        .organization-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationPageComponent implements OnInit {
  private readonly organizationApi = inject(OrganizationApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);
  private readonly defaultListQuery = { page: 1, pageSize: 20 } as const;

  protected readonly displayedColumns = ['name', 'manager', 'actions'];
  protected readonly departments = signal<ListDepartmentsResponse['data']>([]);
  protected readonly selectedDepartment = signal<ListDepartmentsResponse['data'][number] | null>(null);
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);

  readonly departmentForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    managerId: [0, Validators.required]
  });

  ngOnInit(): void {
    this.loadDepartments();
  }

  private loadDepartments(): void {
    this.loading.set(true);
    this.organizationApi
      .listDepartments({ query: this.defaultListQuery })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.departments.set(response.data),
        error: () => this.snackbar.error('Failed to load departments')
      });
  }

  editDepartment(department: ListDepartmentsResponse['data'][number]): void {
    this.selectedDepartment.set(department);
    this.departmentForm.setValue({
      name: department.name,
      managerId: 0
    });
  }

  resetForm(): void {
    this.selectedDepartment.set(null);
    this.departmentForm.reset({ name: '', managerId: 0 });
  }

  saveDepartment(): void {
    if (this.departmentForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const body = this.departmentForm.getRawValue();
    const request$ = this.selectedDepartment()
      ? this.organizationApi.updateDepartment({
          pathParams: { id: this.selectedDepartment()!.id },
          body
        })
      : this.organizationApi.createDepartment({ body });

    request$
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Department saved successfully');
          this.resetForm();
          this.loadDepartments();
        },
        error: () => this.snackbar.error('Failed to save department')
      });
  }
}
