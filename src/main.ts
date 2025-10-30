import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';
import { LoggingInterceptor } from './app/core/interceptors/logging.interceptor';
import { provideAppConfig } from './app/core/config/app-config.provider';
import { provideMatSnackBar } from './app/shared/services/snackbar';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([LoggingInterceptor, AuthInterceptor, ErrorInterceptor])),
    provideAnimations(),
    provideAppConfig(),
    provideMatSnackBar()
  ]
}).catch((err) => console.error(err));
