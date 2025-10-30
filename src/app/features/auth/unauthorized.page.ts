import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-unauthorized-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="center">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Access Denied</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>You do not have permission to view this section.</p>
          <button mat-stroked-button color="primary" routerLink="/">Go home</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .center {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
      }
      mat-card {
        padding: 16px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedPageComponent {}
