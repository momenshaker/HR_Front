/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Errorresponse } from '../models';
export interface GetapidepartmentsdepartmentidemployeesOptions {
  pathParams: {
    departmentId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class DepartmentemployeesApiService {
  private readonly client = inject(ApiClient);

  getApiDepartmentsDepartmentidEmployees(options: GetapidepartmentsdepartmentidemployeesOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/departments/:departmentId/employees', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

}