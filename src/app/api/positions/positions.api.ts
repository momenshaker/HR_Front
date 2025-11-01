/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createpositionrequest, Errorresponse, Updatepositionrequest } from '../models';
export interface Getapiv1positionsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1positionsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createpositionrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1positionsorganizationunitorganizationunitidOptions {
  pathParams: {
    organizationUnitId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1positionsemployeeemployeeidOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1positionsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1positionsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updatepositionrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1positionsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class PositionsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Positions(options: Getapiv1positionsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Positions', {
      headers: options.headers,
    });
  }

  postApiV1Positions(options: Postapiv1positionsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createpositionrequest>('POST', '/api/v1/Positions', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1PositionsOrganizationUnitOrganizationunitid(options: Getapiv1positionsorganizationunitorganizationunitidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Positions/organization-unit/:organizationUnitId', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1PositionsEmployeeEmployeeid(options: Getapiv1positionsemployeeemployeeidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Positions/employee/:employeeId', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1PositionsId(options: Getapiv1positionsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Positions/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1PositionsId(options: Putapiv1positionsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatepositionrequest>('PUT', '/api/v1/Positions/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1PositionsId(options: Deleteapiv1positionsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/Positions/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}