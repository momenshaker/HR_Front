/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Errorresponse, Scheduleinterviewrequest, Updateinterviewschedulerequest } from '../models';
export interface Getapiv1interviewsOptions {
  pathParams?: undefined;
  query?: {
    vacancyId?: string | number | boolean;
    candidateId?: string | number | boolean;
    onlyUpcoming?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1interviewsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Scheduleinterviewrequest;
  headers?: Record<string, string>;
}

export interface Putapiv1interviewsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updateinterviewschedulerequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1interviewsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class InterviewsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Interviews(options: Getapiv1interviewsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Interviews', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiV1Interviews(options: Postapiv1interviewsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Scheduleinterviewrequest>('POST', '/api/v1/Interviews', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  putApiV1InterviewsId(options: Putapiv1interviewsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateinterviewschedulerequest>('PUT', '/api/v1/Interviews/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1InterviewsId(options: Deleteapiv1interviewsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/Interviews/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}