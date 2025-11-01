/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createattendancerecordrequest, Errorresponse, Updateattendancerecordrequest } from '../models';
export interface Getapiv1attendancerecordsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1attendancerecordsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createattendancerecordrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1attendancerecordsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1attendancerecordsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updateattendancerecordrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1attendancerecordsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class AttendancerecordsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Attendancerecords(options: Getapiv1attendancerecordsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/AttendanceRecords', {
      headers: options.headers,
    });
  }

  postApiV1Attendancerecords(options: Postapiv1attendancerecordsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createattendancerecordrequest>('POST', '/api/v1/AttendanceRecords', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1AttendancerecordsId(options: Getapiv1attendancerecordsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/AttendanceRecords/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1AttendancerecordsId(options: Putapiv1attendancerecordsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateattendancerecordrequest>('PUT', '/api/v1/AttendanceRecords/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1AttendancerecordsId(options: Deleteapiv1attendancerecordsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/AttendanceRecords/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}