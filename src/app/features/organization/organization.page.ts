import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { finalize } from 'rxjs';
import { DepartmentsApiService } from '../../api';
import { SnackbarService } from '../../shared/services/snackbar';
import { TableShellComponent } from '../../shared/components/table-shell/table-shell.component';
import { FormShellComponent } from '../../shared/components/form-shell/form-shell.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

interface DepartmentFormValue {
  name: string;
  code: string;
  parentDepartmentId: string | null;
  managerId: string | null;
  branch: string | null;
  location: string | null;
  description: string | null;
  isActive: boolean;
}

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
    MatCheckboxModule,
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

            <ng-container matColumnDef="code">
              <th mat-header-cell *matHeaderCellDef>Code</th>
              <td mat-cell *matCellDef="let department">{{ department.code }}</td>
            </ng-container>

            <ng-container matColumnDef="manager">
              <th mat-header-cell *matHeaderCellDef>Manager</th>
              <td mat-cell *matCellDef="let department">
                {{ department.managerName || department.managerId || '—' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="isActive">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let department">{{ department.isActive ? 'Active' : 'Inactive' }}</td>
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
            <mat-error *ngIf="departmentForm.controls.name.hasError('maxlength')">
              Name must be 150 characters or less
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Code</mat-label>
            <input matInput formControlName="code" required />
            <mat-error *ngIf="departmentForm.controls.code.hasError('required')">Code is required</mat-error>
            <mat-error *ngIf="departmentForm.controls.code.hasError('maxlength')">
              Code must be 20 characters or less
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Parent Department ID</mat-label>
            <input matInput formControlName="parentDepartmentId" />
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Manager ID</mat-label>
            <input matInput formControlName="managerId" />
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Branch</mat-label>
            <input matInput formControlName="branch" />
            <mat-error *ngIf="departmentForm.controls.branch.hasError('maxlength')">
              Branch must be 100 characters or less
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Location</mat-label>
            <input matInput formControlName="location" />
            <mat-error *ngIf="departmentForm.controls.location.hasError('maxlength')">
              Location must be 200 characters or less
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="3"></textarea>
            <mat-error *ngIf="departmentForm.controls.description.hasError('maxlength')">
              Description must be 500 characters or less
            </mat-error>
          </mat-form-field>

          <mat-checkbox class="checkbox-field full-width" formControlName="isActive">Active</mat-checkbox>

          <div class="actions full-width">
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
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        align-items: start;
      }

      .full-width {
        grid-column: 1 / -1;
      }

      .checkbox-field {
        display: flex;
        align-items: center;
      }

      .actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
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
  private readonly organizationApi = inject(DepartmentsApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly displayedColumns = ['name', 'code', 'manager', 'isActive', 'actions'];
  protected readonly departments = signal<any[]>([]);
  protected readonly selectedDepartment = signal<any | null>(null);
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);

  readonly departmentForm = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(150)]),
    code: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(20)]),
    parentDepartmentId: this.fb.control<string | null>(null),
    managerId: this.fb.control<string | null>(null),
    branch: this.fb.control<string | null>(null, [Validators.maxLength(100)]),
    location: this.fb.control<string | null>(null, [Validators.maxLength(200)]),
    description: this.fb.control<string | null>(null, [Validators.maxLength(500)]),
    isActive: this.fb.nonNullable.control(true)
  });

  ngOnInit(): void {
    this.loadDepartments();
  }

  private loadDepartments(): void {
    this.loading.set(true);
    this.organizationApi
      .getApiOrganizationsOrganizationidDepartments({ pathParams: { organizationId: 1 } })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.departments.set(((response as any)?.Items ?? []) as any[]),
        error: () => this.snackbar.error('Failed to load departments')
      });
  }

  editDepartment(department: any): void {
    this.selectedDepartment.set(department);
    this.departmentForm.setValue({
      name: department.name,
      code: department.code,
      parentDepartmentId: department.parentDepartmentId ?? null,
      managerId: department.managerId ?? null,
      branch: department.branch ?? null,
      location: department.location ?? null,
      description: department.description ?? null,
      isActive: department.isActive
    });
  }

  resetForm(): void {
    this.selectedDepartment.set(null);
    this.departmentForm.reset({
      name: '',
      code: '',
      parentDepartmentId: null,
      managerId: null,
      branch: null,
      location: null,
      description: null,
      isActive: true
    });
  }

  saveDepartment(): void {
    if (this.departmentForm.invalid || this.saving()) {
      return;
    }

    this.saving.set(true);
    const body = this.buildRequestBody(this.departmentForm.getRawValue());
    const request$ = this.selectedDepartment()
      ? this.organizationApi.putApiOrganizationsOrganizationidDepartmentsDepartmentid({
          pathParams: { organizationId: 1, departmentId: this.selectedDepartment()!.id },
          body: body as any
        })
      : this.organizationApi.postApiOrganizationsOrganizationidDepartments({
          pathParams: { organizationId: 1 },
          body: body as any
        });

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

  private buildRequestBody(formValue: DepartmentFormValue): DepartmentFormValue {
    return {
      ...formValue,
      name: formValue.name.trim(),
      code: formValue.code.trim(),
      parentDepartmentId: this.toNullable(formValue.parentDepartmentId),
      managerId: this.toNullable(formValue.managerId),
      branch: this.toNullable(formValue.branch),
      location: this.toNullable(formValue.location),
      description: this.toNullable(formValue.description)
    };
  }

  private toNullable(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }
}

