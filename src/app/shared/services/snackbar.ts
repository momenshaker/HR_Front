import { importProvidersFrom, inject, Injectable, Provider } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['snackbar-success'],
      ...config
    });
  }

  error(message: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: ['snackbar-error'],
      ...config
    });
  }
}

export function provideMatSnackBar(): Provider[] {
  return [importProvidersFrom(MatSnackBarModule)];
}
