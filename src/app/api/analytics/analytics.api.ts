/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Errorresponse } from '../models';
export interface GetapianalyticsheadcountOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    departmentId?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface GetapianalyticsutilizationOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    from?: string | number | boolean;
    to?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface GetapianalyticsleaveusageOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    year?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface GetapianalyticspayrolltotalsOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    from?: string | number | boolean;
    to?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface GetapianalyticsrecruitmentfunnelOptions {
  pathParams?: undefined;
  query?: {
    jobId?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface GetapianalyticstrainingcomplianceOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsApiService {
  private readonly client = inject(ApiClient);

  getApiAnalyticsHeadcount(options: GetapianalyticsheadcountOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/analytics/headcount', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiAnalyticsUtilization(options: GetapianalyticsutilizationOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/analytics/utilization', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiAnalyticsLeaveUsage(options: GetapianalyticsleaveusageOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/analytics/leave-usage', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiAnalyticsPayrollTotals(options: GetapianalyticspayrolltotalsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/analytics/payroll-totals', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiAnalyticsRecruitmentFunnel(options: GetapianalyticsrecruitmentfunnelOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/analytics/recruitment-funnel', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiAnalyticsTrainingCompliance(options: GetapianalyticstrainingcomplianceOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/analytics/training-compliance', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

}