/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Errorresponse } from '../models';
export interface Getapiv1recruitmentinsightsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class RecruitmentinsightsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Recruitmentinsights(options: Getapiv1recruitmentinsightsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/RecruitmentInsights', {
      headers: options.headers,
    });
  }

}