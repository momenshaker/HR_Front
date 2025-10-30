import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { SnackbarService } from '../../shared/services/snackbar';

const IDEMPOTENT_METHODS = new Set(['GET']);

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(SnackbarService);
  const shouldRetry = IDEMPOTENT_METHODS.has(req.method.toUpperCase());

  return next(req).pipe(
    retry(shouldRetry ? 1 : 0),
    catchError((error: HttpErrorResponse) => {
      const message = mapErrorToMessage(error);
      snackbar.error(message);
      return throwError(() => error);
    })
  );
};

function mapErrorToMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Network error occurred. Please check your connection and try again.';
  }
  switch (error.status) {
    case 400:
      return 'Invalid request. Please review the data and submit again.';
    case 401:
      return 'Your session has expired. Please log in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'Conflict detected. Please refresh and retry.';
    case 422:
      return 'Some fields need attention. Check validation messages.';
    case 500:
    default:
      return 'Unexpected server error. Please try again later.';
  }
}
