import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { SnackbarService } from '../../shared/services/snackbar';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    RouterLink
  ],
  template: `
    <div class="login-wrapper">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Sign in to HR Platform</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required />
              <mat-error *ngIf="form.controls.email.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="form.controls.email.hasError('email')">Enter a valid email</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password" required />
              <mat-error *ngIf="form.controls.password.hasError('required')">Password is required</mat-error>
            </mat-form-field>

            <button mat-flat-button color="primary" class="full-width" [disabled]="form.invalid || submitting()">
              {{ submitting() ? 'Signing in…' : 'Sign In' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80vh;
      }
      mat-card {
        width: min(420px, 95vw);
      }
      .full-width {
        width: 100%;
      }
      mat-card-title {
        font-size: 1.25rem;
        font-weight: 600;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly snackbar = inject(SnackbarService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly submitting = signal(false);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      return;
    }
    this.submitting.set(true);
    const { email, password } = this.form.getRawValue();
    this.authService
      .login(email!, password!)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.snackbar.success('Welcome back!');
          void this.router.navigate(['/organization']);
        },
        error: () => {
          this.snackbar.error('Unable to sign in. Please check your credentials.');
        }
      });
  }
}
