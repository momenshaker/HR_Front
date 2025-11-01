/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Errorresponse, Newleaverequestinput } from '../models';
export interface Getapiv1leavetypesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1leavebalancesOptions {
  pathParams?: undefined;
  query?: {
    employeeId?: string | number | boolean;
    year?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1leaverequestsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Newleaverequestinput;
  headers?: Record<string, string>;
}

export interface Getapiv1leaverequestsOptions {
  pathParams?: undefined;
  query?: {
    employeeId?: string | number | boolean;
    managerId?: string | number | boolean;
    status?: string | number | boolean;
    page?: string | number | boolean;
    pageSize?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1leaverequestsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1leaverequestsidsubmitOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1leaverequestsidapproveOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    managerId?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1leaverequestsidrejectOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    managerId?: string | number | boolean;
  };
  body?: string;
  headers?: Record<string, string>;
}

export interface Postapiv1leaverequestsidcancelOptions {
  pathParams: {
    id: string | number;
  };
  query?: {
    employeeId?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class LeaveApiService {
  private readonly client = inject(ApiClient);

  getApiV1LeaveTypes(options: Getapiv1leavetypesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/leave/types', {
      headers: options.headers,
    });
  }

  getApiV1LeaveBalances(options: Getapiv1leavebalancesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/leave/balances', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiV1LeaveRequests(options: Postapiv1leaverequestsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Newleaverequestinput>('POST', '/api/v1/leave/requests', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1LeaveRequests(options: Getapiv1leaverequestsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/leave/requests', {
      queryParams: options.query,
      headers: options.headers,
    });
  }

  getApiV1LeaveRequestsId(options: Getapiv1leaverequestsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/leave/requests/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1LeaveRequestsIdSubmit(options: Postapiv1leaverequestsidsubmitOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/v1/leave/requests/:id:submit', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1LeaveRequestsIdApprove(options: Postapiv1leaverequestsidapproveOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/v1/leave/requests/:id:approve', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

  postApiV1LeaveRequestsIdReject(options: Postapiv1leaverequestsidrejectOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, string>('POST', '/api/v1/leave/requests/:id:reject', {
      pathParams: options.pathParams,
      queryParams: options.query,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1LeaveRequestsIdCancel(options: Postapiv1leaverequestsidcancelOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/v1/leave/requests/:id:cancel', {
      pathParams: options.pathParams,
      queryParams: options.query,
      headers: options.headers,
    });
  }

}