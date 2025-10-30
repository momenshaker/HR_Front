import { InjectionToken, Provider } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface AppConfig {
  apiBaseUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export function provideAppConfig(): Provider {
  return {
    provide: APP_CONFIG,
    useValue: {
      apiBaseUrl: environment.apiBaseUrl
    }
  };
}
