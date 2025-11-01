/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createpayrollrunrequest, Errorresponse } from '../models';
export interface GetapipayrollrunsOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    status?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapipayrollrunsOptions {
  pathParams?: undefined;
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Createpayrollrunrequest;
  headers?: Record<string, string>;
}

export interface GetapipayrollrunsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface GetapipayrollrunsiditemsOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapipayrollrunsidcalculateOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapipayrollrunsidapproveOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapipayrollrunsidpaidOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapipayrollrunsidpayslipsOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface GetapipayrollpayslipsOptions {
  pathParams?: undefined;
  query?: {
    employeeId?: string | number | boolean;
    periodStart?: string | number | boolean;
    periodEnd?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class PayrollrunsApiService {
  private readonly client = inject(ApiClient);

  getApiPayrollRuns(options: GetapipayrollrunsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/payroll/runs', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiPayrollRuns(options: PostapipayrollrunsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createpayrollrunrequest>('POST', '/api/payroll/runs', {
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiPayrollRunsId(options: GetapipayrollrunsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/payroll/runs/:id', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiPayrollRunsIdItems(options: GetapipayrollrunsiditemsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/payroll/runs/:id/items', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiPayrollRunsIdCalculate(options: PostapipayrollrunsidcalculateOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/payroll/runs/:id:calculate', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiPayrollRunsIdApprove(options: PostapipayrollrunsidapproveOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/payroll/runs/:id:approve', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiPayrollRunsIdPaid(options: PostapipayrollrunsidpaidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/payroll/runs/:id:paid', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiPayrollRunsIdPayslips(options: PostapipayrollrunsidpayslipsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/payroll/runs/:id:payslips', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiPayrollPayslips(options: GetapipayrollpayslipsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/payroll/payslips', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

}