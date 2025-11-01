/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createemployeerequest, Employeedepartmentidentifiersrequest, Errorresponse, Updateemployeerequest } from '../models';
export interface GetapiemployeesOptions {
  pathParams?: undefined;
  query?: {
    orgId?: string | number | boolean;
    q?: string | number | boolean;
    page?: string | number | boolean;
    pageSize?: string | number | boolean;
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapiemployeesOptions {
  pathParams?: undefined;
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Createemployeerequest;
  headers?: Record<string, string>;
}

export interface GetapiemployeesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PutapiemployeesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Updateemployeerequest;
  headers?: Record<string, string>;
}

export interface DeleteapiemployeesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface GetapiemployeesemployeeiddepartmentsOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface PostapiemployeesemployeeiddepartmentsassignOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Employeedepartmentidentifiersrequest;
  headers?: Record<string, string>;
}

export interface PostapiemployeesemployeeiddepartmentsreplaceOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Employeedepartmentidentifiersrequest;
  headers?: Record<string, string>;
}

export interface PostapiemployeesemployeeiddepartmentsunassignOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: {
    "api-version"?: string | number | boolean;
  };
  body?: Employeedepartmentidentifiersrequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  private readonly client = inject(ApiClient);

  getApiEmployees(options: GetapiemployeesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/employees', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiEmployees(options: PostapiemployeesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createemployeerequest>('POST', '/api/employees', {
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiEmployeesId(options: GetapiemployeesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/employees/:id', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  putApiEmployeesId(options: PutapiemployeesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateemployeerequest>('PUT', '/api/employees/:id', {
      pathParams: options.pathParams,
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiEmployeesId(options: DeleteapiemployeesidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/employees/:id', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiEmployeesEmployeeidDepartments(options: GetapiemployeesemployeeiddepartmentsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/employees/:employeeId/departments', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiEmployeesEmployeeidDepartmentsAssign(options: PostapiemployeesemployeeiddepartmentsassignOptions): Observable<unknown> {
    return this.client.request<unknown, Employeedepartmentidentifiersrequest>('POST', '/api/employees/:employeeId/departments:assign', {
      pathParams: options.pathParams,
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiEmployeesEmployeeidDepartmentsReplace(options: PostapiemployeesemployeeiddepartmentsreplaceOptions): Observable<unknown> {
    return this.client.request<unknown, Employeedepartmentidentifiersrequest>('POST', '/api/employees/:employeeId/departments:replace', {
      pathParams: options.pathParams,
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiEmployeesEmployeeidDepartmentsUnassign(options: PostapiemployeesemployeeiddepartmentsunassignOptions): Observable<unknown> {
    return this.client.request<unknown, Employeedepartmentidentifiersrequest>('POST', '/api/employees/:employeeId/departments:unassign', {
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