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
  EmployeesApiService,
  ListEmployeesResponse,
  GetEmployeeDetailsResponse
} from '../../api/employees/employees.api';
import { TableShellComponent } from '../../shared/components/table-shell/table-shell.component';
import { FormShellComponent } from '../../shared/components/form-shell/form-shell.component';
import { SnackbarService } from '../../shared/services/snackbar';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-employees-page',
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
    FormShellComponent,
    LoadingStateComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="employees-grid">
      <app-table-shell title="Employees" subtitle="Directory">
        <form class="filters" [formGroup]="filtersForm" (ngSubmit)="loadEmployees()">
          <mat-form-field appearance="fill">
            <mat-label>Department ID</mat-label>
            <input matInput formControlName="departmentId" type="number" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Page</mat-label>
            <input matInput formControlName="page" type="number" min="1" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Page size</mat-label>
            <input matInput formControlName="pageSize" type="number" min="1" />
          </mat-form-field>
          <button mat-stroked-button color="primary">Apply</button>
        </form>

        <ng-container *ngIf="!loading(); else loadingTpl">
          <table mat-table [dataSource]="employees()" class="mat-elevation-z1" *ngIf="employees().length; else emptyTpl">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let employee">{{ employee.firstName }} {{ employee.lastName }}</td>
            </ng-container>
            <ng-container matColumnDef="department">
              <th mat-header-cell *matHeaderCellDef>Department</th>
              <td mat-cell *matCellDef="let employee">{{ employee.department }}</td>
            </ng-container>
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let employee">{{ employee.title }}</td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let employee">{{ employee.status }}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let employee">
                <button mat-button color="primary" (click)="selectEmployee(employee)">View</button>
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
          <app-empty-state message="No employees found"></app-empty-state>
        </ng-template>
      </app-table-shell>

      <div class="detail-panel" *ngIf="selectedEmployee(); else selectPrompt">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ selectedEmployee()!.firstName }} {{ selectedEmployee()!.lastName }}</mat-card-title>
            <mat-card-subtitle>{{ selectedEmployee()!.job.title }} · {{ selectedEmployee()!.job.department }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p><strong>Email:</strong> {{ selectedEmployee()!.email }}</p>
            <p><strong>Status:</strong> {{ selectedEmployee()!.status }}</p>
            <p><strong>Manager:</strong> {{ selectedEmployee()!.job.manager }}</p>
          </mat-card-content>
        </mat-card>
      </div>
      <ng-template #selectPrompt>
        <app-empty-state message="Select an employee to view details" icon="person"></app-empty-state>
      </ng-template>

      <app-form-shell title="Add employee">
        <form [formGroup]="createForm" class="form-grid" (ngSubmit)="createEmployee()">
          <mat-form-field appearance="fill">
            <mat-label>First name</mat-label>
            <input matInput formControlName="firstName" required />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Last name</mat-label>
            <input matInput formControlName="lastName" required />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" required />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Department ID</mat-label>
            <input matInput type="number" formControlName="departmentId" required />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title" required />
          </mat-form-field>
          <button mat-flat-button color="primary" [disabled]="createForm.invalid || creating()">
            {{ creating() ? 'Saving…' : 'Create employee' }}
          </button>
        </form>
      </app-form-shell>
    </div>
  `,
  styles: [
    `
      .employees-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
        align-items: start;
      }
      .filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
      }
      table {
        width: 100%;
      }
      .detail-panel {
        grid-row: span 2;
      }
      .form-grid {
        display: grid;
        gap: 16px;
      }
      @media (max-width: 1080px) {
        .employees-grid {
          grid-template-columns: 1fr;
        }
        .detail-panel {
          grid-row: auto;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageComponent implements OnInit {
  private readonly employeesApi = inject(EmployeesApiService);
  private readonly snackbar = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);

  protected readonly displayedColumns = ['name', 'department', 'title', 'status', 'actions'];
  protected readonly employees = signal<ListEmployeesResponse['data']>([]);
  protected readonly selectedEmployee = signal<GetEmployeeDetailsResponse | null>(null);
  protected readonly loading = signal(false);
  protected readonly creating = signal(false);

  readonly filtersForm = this.fb.group({
    departmentId: [''],
    page: [1],
    pageSize: [20]
  });

  readonly createForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    departmentId: [0, Validators.required],
    title: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading.set(true);
    const { departmentId, page, pageSize } = this.filtersForm.getRawValue();
    this.employeesApi
      .listEmployees({
        query: {
          departmentId: departmentId || undefined,
          page: page ?? 1,
          pageSize: pageSize ?? 20
        }
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.employees.set(response.data),
        error: () => this.snackbar.error('Failed to load employees')
      });
  }

  selectEmployee(employee: ListEmployeesResponse['data'][number]): void {
    this.employeesApi
      .getEmployeeDetails({ pathParams: { id: employee.id } })
      .subscribe({
        next: (detail) => this.selectedEmployee.set(detail),
        error: () => this.snackbar.error('Failed to load employee details')
      });
  }

  createEmployee(): void {
    if (this.createForm.invalid || this.creating()) {
      return;
    }
    this.creating.set(true);
    const body = this.createForm.getRawValue();
    this.employeesApi
      .createEmployee({ body })
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Employee created');
          this.createForm.reset({ firstName: '', lastName: '', email: '', departmentId: 0, title: '' });
          this.loadEmployees();
        },
        error: () => this.snackbar.error('Failed to create employee')
      });
  }
}
