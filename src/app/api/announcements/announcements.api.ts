/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createannouncementrequest, Errorresponse, Updateannouncementrequest } from '../models';
export interface Getapiv1announcementsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1announcementsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createannouncementrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1announcementsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1announcementsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updateannouncementrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1announcementsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class AnnouncementsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Announcements(options: Getapiv1announcementsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Announcements', {
      headers: options.headers,
    });
  }

  postApiV1Announcements(options: Postapiv1announcementsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createannouncementrequest>('POST', '/api/v1/Announcements', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1AnnouncementsId(options: Getapiv1announcementsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Announcements/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1AnnouncementsId(options: Putapiv1announcementsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateannouncementrequest>('PUT', '/api/v1/Announcements/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1AnnouncementsId(options: Deleteapiv1announcementsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/Announcements/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}