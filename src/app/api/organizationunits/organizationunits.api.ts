/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createorganizationunitrequest, Errorresponse, Updateorganizationunitrequest } from '../models';
export interface Getapiv1organizationunitsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1organizationunitsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createorganizationunitrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1organizationunitshierarchyOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1organizationunitsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1organizationunitsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updateorganizationunitrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1organizationunitsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class OrganizationunitsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Organizationunits(options: Getapiv1organizationunitsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/OrganizationUnits', {
      headers: options.headers,
    });
  }

  postApiV1Organizationunits(options: Postapiv1organizationunitsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createorganizationunitrequest>('POST', '/api/v1/OrganizationUnits', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1OrganizationunitsHierarchy(options: Getapiv1organizationunitshierarchyOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/OrganizationUnits/hierarchy', {
      headers: options.headers,
    });
  }

  getApiV1OrganizationunitsId(options: Getapiv1organizationunitsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/OrganizationUnits/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1OrganizationunitsId(options: Putapiv1organizationunitsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateorganizationunitrequest>('PUT', '/api/v1/OrganizationUnits/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1OrganizationunitsId(options: Deleteapiv1organizationunitsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/OrganizationUnits/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}