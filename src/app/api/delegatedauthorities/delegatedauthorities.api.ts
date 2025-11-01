/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createdelegatedauthorityrequest, Errorresponse, Updatedelegatedauthorityrequest } from '../models';
export interface Getapiv1delegatedauthoritiesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1delegatedauthoritiesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createdelegatedauthorityrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1delegatedauthoritiesgrantoremployeeidOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1delegatedauthoritiesdelegateemployeeidOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1delegatedauthoritiesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1delegatedauthoritiesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updatedelegatedauthorityrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1delegatedauthoritiesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class DelegatedauthoritiesApiService {
  private readonly client = inject(ApiClient);

  getApiV1Delegatedauthorities(options: Getapiv1delegatedauthoritiesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/DelegatedAuthorities', {
      headers: options.headers,
    });
  }

  postApiV1Delegatedauthorities(options: Postapiv1delegatedauthoritiesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createdelegatedauthorityrequest>('POST', '/api/v1/DelegatedAuthorities', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1DelegatedauthoritiesGrantorEmployeeid(options: Getapiv1delegatedauthoritiesgrantoremployeeidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/DelegatedAuthorities/grantor/:employeeId', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1DelegatedauthoritiesDelegateEmployeeid(options: Getapiv1delegatedauthoritiesdelegateemployeeidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/DelegatedAuthorities/delegate/:employeeId', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1DelegatedauthoritiesId(options: Getapiv1delegatedauthoritiesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/DelegatedAuthorities/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1DelegatedauthoritiesId(options: Putapiv1delegatedauthoritiesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatedelegatedauthorityrequest>('PUT', '/api/v1/DelegatedAuthorities/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1DelegatedauthoritiesId(options: Deleteapiv1delegatedauthoritiesidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/DelegatedAuthorities/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}