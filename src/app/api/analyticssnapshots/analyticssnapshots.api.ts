/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createanalyticssnapshotrequest, Errorresponse, Updateanalyticssnapshotrequest } from '../models';
export interface Getapiv1analyticssnapshotsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1analyticssnapshotsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createanalyticssnapshotrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1analyticssnapshotsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1analyticssnapshotsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updateanalyticssnapshotrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1analyticssnapshotsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class AnalyticssnapshotsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Analyticssnapshots(options: Getapiv1analyticssnapshotsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/AnalyticsSnapshots', {
      headers: options.headers,
    });
  }

  postApiV1Analyticssnapshots(options: Postapiv1analyticssnapshotsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createanalyticssnapshotrequest>('POST', '/api/v1/AnalyticsSnapshots', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1AnalyticssnapshotsId(options: Getapiv1analyticssnapshotsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/AnalyticsSnapshots/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1AnalyticssnapshotsId(options: Putapiv1analyticssnapshotsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateanalyticssnapshotrequest>('PUT', '/api/v1/AnalyticsSnapshots/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1AnalyticssnapshotsId(options: Deleteapiv1analyticssnapshotsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/AnalyticsSnapshots/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}