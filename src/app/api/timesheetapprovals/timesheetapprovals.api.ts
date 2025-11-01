/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Errorresponse } from '../models';
export interface Getapiv1timeapprovalsOptions {
  pathParams?: undefined;
  query?: {
    managerId?: string | number | boolean;
    status?: string | number | boolean;
    page?: string | number | boolean;
    pageSize?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class TimesheetapprovalsApiService {
  private readonly client = inject(ApiClient);

  getApiV1TimeApprovals(options: Getapiv1timeapprovalsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/time/approvals', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

}