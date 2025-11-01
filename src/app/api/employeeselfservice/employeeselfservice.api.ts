/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Clockinrequest, Clockoutrequest, Createleaverequest, Createselfserviceaccountrequest, Errorresponse, Updateselfserviceaccountrequest } from '../models';
export interface Getapiv1employeesemployeeidselfserviceleaverequestsOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1employeesemployeeidselfserviceleaverequestsOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: Createleaverequest;
  headers?: Record<string, string>;
}

export interface Postapiv1employeesemployeeidselfserviceattendanceclockinOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: Clockinrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1employeesemployeeidselfserviceattendanceattendancerecordidclockoutOptions {
  pathParams: {
    employeeId: string | number;
    attendanceRecordId: string | number;
  };
  query?: undefined;
  body?: Clockoutrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1employeesemployeeidselfservicesalaryslipsOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1employeesemployeeidselfservicetrainingcoursesOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1employeesemployeeidselfserviceorganizationOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1employeesemployeeidselfservicedelegatedauthoritiesOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1employeesemployeeidselfserviceaccountOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1employeesemployeeidselfserviceaccountOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: Createselfserviceaccountrequest;
  headers?: Record<string, string>;
}

export interface Putapiv1employeesemployeeidselfserviceaccountOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: Updateselfserviceaccountrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1employeesemployeeidselfserviceaccountOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class EmployeeselfserviceApiService {
  private readonly client = inject(ApiClient);

  getApiV1EmployeesEmployeeidSelfServiceLeaveRequests(options: Getapiv1employeesemployeeidselfserviceleaverequestsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/employees/:employeeId/self-service/leave-requests', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1EmployeesEmployeeidSelfServiceLeaveRequests(options: Postapiv1employeesemployeeidselfserviceleaverequestsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createleaverequest>('POST', '/api/v1/employees/:employeeId/self-service/leave-requests', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1EmployeesEmployeeidSelfServiceAttendanceClockIn(options: Postapiv1employeesemployeeidselfserviceattendanceclockinOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Clockinrequest>('POST', '/api/v1/employees/:employeeId/self-service/attendance/clock-in', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1EmployeesEmployeeidSelfServiceAttendanceAttendancerecordidClockOut(options: Postapiv1employeesemployeeidselfserviceattendanceattendancerecordidclockoutOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Clockoutrequest>('POST', '/api/v1/employees/:employeeId/self-service/attendance/:attendanceRecordId/clock-out', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1EmployeesEmployeeidSelfServiceSalarySlips(options: Getapiv1employeesemployeeidselfservicesalaryslipsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/employees/:employeeId/self-service/salary-slips', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1EmployeesEmployeeidSelfServiceTrainingCourses(options: Getapiv1employeesemployeeidselfservicetrainingcoursesOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/employees/:employeeId/self-service/training-courses', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1EmployeesEmployeeidSelfServiceOrganization(options: Getapiv1employeesemployeeidselfserviceorganizationOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/employees/:employeeId/self-service/organization', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1EmployeesEmployeeidSelfServiceDelegatedAuthorities(options: Getapiv1employeesemployeeidselfservicedelegatedauthoritiesOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/employees/:employeeId/self-service/delegated-authorities', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1EmployeesEmployeeidSelfServiceAccount(options: Getapiv1employeesemployeeidselfserviceaccountOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/employees/:employeeId/self-service/account', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1EmployeesEmployeeidSelfServiceAccount(options: Postapiv1employeesemployeeidselfserviceaccountOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createselfserviceaccountrequest>('POST', '/api/v1/employees/:employeeId/self-service/account', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  putApiV1EmployeesEmployeeidSelfServiceAccount(options: Putapiv1employeesemployeeidselfserviceaccountOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateselfserviceaccountrequest>('PUT', '/api/v1/employees/:employeeId/self-service/account', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1EmployeesEmployeeidSelfServiceAccount(options: Deleteapiv1employeesemployeeidselfserviceaccountOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/employees/:employeeId/self-service/account', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}