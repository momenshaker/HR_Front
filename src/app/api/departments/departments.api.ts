/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createdepartmentrequest, Errorresponse, Movedepartmentrequest, Updatedepartmentrequest } from '../models';
export interface GetapiorganizationsorganizationiddepartmentsOptions {
  pathParams: {
    organizationId: string | number;
  };
  query?: {
    hierarchy?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapiorganizationsorganizationiddepartmentsOptions {
  pathParams: {
    organizationId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Createdepartmentrequest;
  headers?: Record<string, string>;
}

export interface GetapiorganizationsorganizationiddepartmentsdepartmentidOptions {
  pathParams: {
    organizationId: string | number;
    departmentId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PutapiorganizationsorganizationiddepartmentsdepartmentidOptions {
  pathParams: {
    organizationId: string | number;
    departmentId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Updatedepartmentrequest;
  headers?: Record<string, string>;
}

export interface DeleteapiorganizationsorganizationiddepartmentsdepartmentidOptions {
  pathParams: {
    organizationId: string | number;
    departmentId: string | number;
  };
  query?: {
    cascade?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapiorganizationsorganizationiddepartmentsdepartmentidmoveOptions {
  pathParams: {
    organizationId: string | number;
    departmentId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Movedepartmentrequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class DepartmentsApiService {
  private readonly client = inject(ApiClient);

  getApiOrganizationsOrganizationidDepartments(options: GetapiorganizationsorganizationiddepartmentsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/organizations/:organizationId/departments', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiOrganizationsOrganizationidDepartments(options: PostapiorganizationsorganizationiddepartmentsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createdepartmentrequest>('POST', '/api/organizations/:organizationId/departments', {
      pathParams: options.pathParams,
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiOrganizationsOrganizationidDepartmentsDepartmentid(options: GetapiorganizationsorganizationiddepartmentsdepartmentidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/organizations/:organizationId/departments/:departmentId', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  putApiOrganizationsOrganizationidDepartmentsDepartmentid(options: PutapiorganizationsorganizationiddepartmentsdepartmentidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatedepartmentrequest>('PUT', '/api/organizations/:organizationId/departments/:departmentId', {
      pathParams: options.pathParams,
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiOrganizationsOrganizationidDepartmentsDepartmentid(options: DeleteapiorganizationsorganizationiddepartmentsdepartmentidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/organizations/:organizationId/departments/:departmentId', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiOrganizationsOrganizationidDepartmentsDepartmentidMove(options: PostapiorganizationsorganizationiddepartmentsdepartmentidmoveOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Movedepartmentrequest>('POST', '/api/organizations/:organizationId/departments/:departmentId:move', {
      pathParams: options.pathParams,
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

}