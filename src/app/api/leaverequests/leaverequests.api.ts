/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createleaverequest, Errorresponse, Updateleaverequest } from '../models';
export interface Getapiv1leaverequestsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1leaverequestsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createleaverequest;
  headers?: Record<string, string>;
}

export interface Getapiv1leaverequestsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1leaverequestsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updateleaverequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1leaverequestsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class LeaverequestsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Leaverequests(options: Getapiv1leaverequestsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/LeaveRequests', {
      headers: options.headers,
    });
  }

  postApiV1Leaverequests(options: Postapiv1leaverequestsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createleaverequest>('POST', '/api/v1/LeaveRequests', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1LeaverequestsId(options: Getapiv1leaverequestsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/LeaveRequests/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1LeaverequestsId(options: Putapiv1leaverequestsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateleaverequest>('PUT', '/api/v1/LeaveRequests/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1LeaverequestsId(options: Deleteapiv1leaverequestsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/LeaveRequests/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}