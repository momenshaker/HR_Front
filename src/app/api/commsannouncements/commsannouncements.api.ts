/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createcommsannouncementrequest, Errorresponse } from '../models';
export interface GetapicommsannouncementsOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    departmentId?: string | number | boolean;
    unreadForEmployeeId?: string | number | boolean;
    page?: string | number | boolean;
    pageSize?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapicommsannouncementsOptions {
  pathParams?: undefined;
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Createcommsannouncementrequest;
  headers?: Record<string, string>;
}

export interface PostapicommsannouncementsidpinOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapicommsannouncementsidunpinOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapicommsannouncementsidreadOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    employeeId?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class CommsannouncementsApiService {
  private readonly client = inject(ApiClient);

  getApiCommsAnnouncements(options: GetapicommsannouncementsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/comms/announcements', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiCommsAnnouncements(options: PostapicommsannouncementsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createcommsannouncementrequest>('POST', '/api/comms/announcements', {
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiCommsAnnouncementsIdPin(options: PostapicommsannouncementsidpinOptions): Observable<unknown> {
    return this.client.request<unknown>('POST', '/api/comms/announcements/:id:pin', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiCommsAnnouncementsIdUnpin(options: PostapicommsannouncementsidunpinOptions): Observable<unknown> {
    return this.client.request<unknown>('POST', '/api/comms/announcements/:id:unpin', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiCommsAnnouncementsIdRead(options: PostapicommsannouncementsidreadOptions): Observable<unknown> {
    return this.client.request<unknown>('POST', '/api/comms/announcements/:id:read', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

}