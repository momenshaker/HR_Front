import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';
import { provideAppConfig } from './app/core/config/app-config.provider';
import { provideMatSnackBar } from './app/shared/services/snackbar';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([AuthInterceptor, ErrorInterceptor]), withRequestsMadeViaParent()),
    provideAnimations(),
    provideAppConfig(),
    provideMatSnackBar()
  ]
}).catch((err) => console.error(err));
