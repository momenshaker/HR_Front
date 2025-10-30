import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Organization', route: '/organization', icon: 'corporate_fare' },
  { label: 'Employees', route: '/employees', icon: 'groups' },
  { label: 'Time & Attendance', route: '/time', icon: 'schedule' },
  { label: 'Leave', route: '/leave', icon: 'beach_access' },
  { label: 'Payroll', route: '/payroll', icon: 'paid' },
  { label: 'Performance', route: '/performance', icon: 'insights' },
  { label: 'Recruitment', route: '/recruitment', icon: 'badge' },
  { label: 'Training', route: '/training', icon: 'school' },
  { label: 'Communications', route: '/communications', icon: 'campaign' },
  { label: 'Analytics', route: '/analytics', icon: 'bar_chart' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <mat-sidenav-container class="app-shell">
      <mat-sidenav
        *ngIf="isAuthenticated()"
        class="app-sidenav"
        mode="side"
        opened
      >
        <mat-toolbar color="primary">HR Platform</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item *ngFor="let item of navItems" [routerLink]="item.route" routerLinkActive="active">
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span matListItemTitle>{{ item.label }}</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="app-toolbar">
          <button *ngIf="isAuthenticated()" mat-icon-button (click)="toggleDrawer()" class="menu-button">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="app-title">HR Platform</span>
          <span class="spacer"></span>
          <button *ngIf="isAuthenticated()" mat-button (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </mat-toolbar>
        <main class="app-content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .app-shell {
        min-height: 100vh;
      }
      .app-sidenav {
        width: 260px;
      }
      .app-toolbar {
        position: sticky;
        top: 0;
        z-index: 2;
      }
      .app-content {
        padding: 24px;
      }
      .spacer {
        flex: 1;
      }
      .menu-button {
        margin-right: 16px;
      }
      a.active {
        font-weight: 600;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgFor
  ]
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  protected readonly navItems = NAV_ITEMS;
  protected readonly isAuthenticated = this.authService.isAuthenticated;
  @ViewChild(MatSidenav) private readonly drawer?: MatSidenav;

  logout(): void {
    this.authService.logout();
  }

  toggleDrawer(): void {
    this.drawer?.toggle();
  }
}
