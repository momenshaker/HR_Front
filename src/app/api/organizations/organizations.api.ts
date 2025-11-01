/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createorganizationrequest, Errorresponse, Updateorganizationrequest } from '../models';
export interface GetapiorganizationsOptions {
  pathParams?: undefined;
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapiorganizationsOptions {
  pathParams?: undefined;
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Createorganizationrequest;
  headers?: Record<string, string>;
}

export interface GetapiorganizationsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PutapiorganizationsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Updateorganizationrequest;
  headers?: Record<string, string>;
}

export interface DeleteapiorganizationsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class OrganizationsApiService {
  private readonly client = inject(ApiClient);

  getApiOrganizations(options: GetapiorganizationsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/organizations', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiOrganizations(options: PostapiorganizationsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createorganizationrequest>('POST', '/api/organizations', {
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiOrganizationsId(options: GetapiorganizationsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/organizations/:id', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  putApiOrganizationsId(options: PutapiorganizationsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateorganizationrequest>('PUT', '/api/organizations/:id', {
      pathParams: options.pathParams,
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiOrganizationsId(options: DeleteapiorganizationsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/organizations/:id', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

}