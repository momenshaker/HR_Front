/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Errorresponse } from '../models';
export interface Getapiv1platformconfigurationOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class PlatformconfigurationApiService {
  private readonly client = inject(ApiClient);

  getApiV1PlatformConfiguration(options: Getapiv1platformconfigurationOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/platform/configuration', {
      headers: options.headers,
    });
  }

}