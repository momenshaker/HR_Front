/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createperformancereviewrequest, Errorresponse, Updateperformancereviewrequest } from '../models';
export interface Getapiv1performancereviewsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1performancereviewsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createperformancereviewrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1performancereviewsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1performancereviewsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updateperformancereviewrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1performancereviewsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class PerformancereviewsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Performancereviews(options: Getapiv1performancereviewsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/PerformanceReviews', {
      headers: options.headers,
    });
  }

  postApiV1Performancereviews(options: Postapiv1performancereviewsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createperformancereviewrequest>('POST', '/api/v1/PerformanceReviews', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1PerformancereviewsId(options: Getapiv1performancereviewsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/PerformanceReviews/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1PerformancereviewsId(options: Putapiv1performancereviewsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateperformancereviewrequest>('PUT', '/api/v1/PerformanceReviews/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1PerformancereviewsId(options: Deleteapiv1performancereviewsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/PerformanceReviews/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}