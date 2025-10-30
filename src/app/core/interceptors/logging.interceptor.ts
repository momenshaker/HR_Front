import { HttpEvent, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

function now(): number {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

function formatEvent(event: HttpEvent<unknown>): string {
  if (event.type === HttpEventType.Sent) {
    return 'sent';
  }
  if (event.type === HttpEventType.Response) {
    return `response ${event.status}`;
  }
  return HttpEventType[event.type] ?? `event ${event.type}`;
}

export const LoggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = now();
  const requestLabel = `${req.method.toUpperCase()} ${req.urlWithParams}`;

  console.log(`[HTTP] ${requestLabel} - request dispatched`, req);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const elapsed = (now() - startTime).toFixed(0);
          console.log(`[HTTP] ${requestLabel} - response received in ${elapsed} ms`, event);
        } else {
          console.log(`[HTTP] ${requestLabel} - ${formatEvent(event)}`);
        }
      },
      error: (error: unknown) => {
        const elapsed = (now() - startTime).toFixed(0);
        console.error(`[HTTP] ${requestLabel} - failed after ${elapsed} ms`, error);
      }
    })
  );
};
