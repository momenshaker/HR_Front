import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.page').then((m) => m.LoginPageComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/auth/unauthorized.page').then((m) => m.UnauthorizedPageComponent)
  },
  {
    path: 'organization',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/organization/organization.page').then((m) => m.OrganizationPageComponent)
  },
  {
    path: 'employees',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/employees/employees.page').then((m) => m.EmployeesPageComponent)
  },
  {
    path: 'time',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/time/time.page').then((m) => m.TimePageComponent)
  },
  {
    path: 'leave',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/leave/leave.page').then((m) => m.LeavePageComponent)
  },
  {
    path: 'payroll',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/payroll/payroll.page').then((m) => m.PayrollPageComponent)
  },
  {
    path: 'performance',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/performance/performance.page').then((m) => m.PerformancePageComponent)
  },
  {
    path: 'recruitment',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/recruitment/recruitment.page').then((m) => m.RecruitmentPageComponent)
  },
  {
    path: 'training',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/training/training.page').then((m) => m.TrainingPageComponent)
  },
  {
    path: 'communications',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/communications/communications.page').then((m) => m.CommunicationsPageComponent)
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/analytics/analytics.page').then((m) => m.AnalyticsPageComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: 'organization' },
  {
    path: '**',
    loadComponent: () =>
      import('./features/shared/not-found.page').then((m) => m.NotFoundPageComponent)
  }
];
