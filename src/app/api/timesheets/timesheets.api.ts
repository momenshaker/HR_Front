/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Approvetimesheetrequest, Errorresponse, Rejecttimesheetrequest, Upserttimesheetentryrequest } from '../models';
export interface Getapiv1timetimesheetsOptions {
  pathParams?: undefined;
  query?: {
    employeeId?: string | number | boolean;
    weekStart?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1timetimesheetsidentriesOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Upserttimesheetentryrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1timetimesheetsidsubmitOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1timetimesheetsidapproveOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Approvetimesheetrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1timetimesheetsidrejectOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Rejecttimesheetrequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class TimesheetsApiService {
  private readonly client = inject(ApiClient);

  getApiV1TimeTimesheets(options: Getapiv1timetimesheetsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/time/timesheets', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  putApiV1TimeTimesheetsIdEntries(options: Putapiv1timetimesheetsidentriesOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Upserttimesheetentryrequest>('PUT', '/api/v1/time/timesheets/:id/entries', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1TimeTimesheetsIdSubmit(options: Postapiv1timetimesheetsidsubmitOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/v1/time/timesheets/:id:submit', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1TimeTimesheetsIdApprove(options: Postapiv1timetimesheetsidapproveOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Approvetimesheetrequest>('POST', '/api/v1/time/timesheets/:id:approve', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1TimeTimesheetsIdReject(options: Postapiv1timetimesheetsidrejectOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Rejecttimesheetrequest>('POST', '/api/v1/time/timesheets/:id:reject', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

}