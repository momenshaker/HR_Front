/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createlitecourserequest, Createlitecoursesessionrequest, Errorresponse } from '../models';
export interface GetapitrainingcoursesOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapitrainingcoursesOptions {
  pathParams?: undefined;
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Createlitecourserequest;
  headers?: Record<string, string>;
}

export interface GetapitrainingcoursesidsessionsOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapitrainingsessionsOptions {
  pathParams?: undefined;
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Createlitecoursesessionrequest;
  headers?: Record<string, string>;
}

export interface PostapitrainingsessionssessionidenrollOptions {
  pathParams: {
    sessionId: string | number;
  };
  query?: {
    employeeId?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapitrainingsessionssessionidcompleteOptions {
  pathParams: {
    sessionId: string | number;
  };
  query?: {
    employeeId?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapitrainingsessionssessionidcancelOptions {
  pathParams: {
    sessionId: string | number;
  };
  query?: {
    employeeId?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class TrainingApiService {
  private readonly client = inject(ApiClient);

  getApiTrainingCourses(options: GetapitrainingcoursesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/training/courses', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiTrainingCourses(options: PostapitrainingcoursesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createlitecourserequest>('POST', '/api/training/courses', {
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiTrainingCoursesIdSessions(options: GetapitrainingcoursesidsessionsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/training/courses/:id/sessions', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiTrainingSessions(options: PostapitrainingsessionsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createlitecoursesessionrequest>('POST', '/api/training/sessions', {
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiTrainingSessionsSessionidEnroll(options: PostapitrainingsessionssessionidenrollOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/training/sessions/:sessionId/enroll', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiTrainingSessionsSessionidComplete(options: PostapitrainingsessionssessionidcompleteOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/training/sessions/:sessionId/complete', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiTrainingSessionsSessionidCancel(options: PostapitrainingsessionssessionidcancelOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/training/sessions/:sessionId/cancel', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

}