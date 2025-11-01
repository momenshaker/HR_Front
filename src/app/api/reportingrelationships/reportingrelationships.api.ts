/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createreportingrelationshiprequest, Errorresponse, Updatereportingrelationshiprequest } from '../models';
export interface Getapiv1reportingrelationshipsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1reportingrelationshipsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createreportingrelationshiprequest;
  headers?: Record<string, string>;
}

export interface Getapiv1reportingrelationshipsmanagermanagerpositionidOptions {
  pathParams: {
    managerPositionId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1reportingrelationshipsreportreportpositionidOptions {
  pathParams: {
    reportPositionId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1reportingrelationshipsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1reportingrelationshipsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updatereportingrelationshiprequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1reportingrelationshipsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class ReportingrelationshipsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Reportingrelationships(options: Getapiv1reportingrelationshipsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/ReportingRelationships', {
      headers: options.headers,
    });
  }

  postApiV1Reportingrelationships(options: Postapiv1reportingrelationshipsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createreportingrelationshiprequest>('POST', '/api/v1/ReportingRelationships', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1ReportingrelationshipsManagerManagerpositionid(options: Getapiv1reportingrelationshipsmanagermanagerpositionidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/ReportingRelationships/manager/:managerPositionId', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1ReportingrelationshipsReportReportpositionid(options: Getapiv1reportingrelationshipsreportreportpositionidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/ReportingRelationships/report/:reportPositionId', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1ReportingrelationshipsId(options: Getapiv1reportingrelationshipsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/ReportingRelationships/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1ReportingrelationshipsId(options: Putapiv1reportingrelationshipsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatereportingrelationshiprequest>('PUT', '/api/v1/ReportingRelationships/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1ReportingrelationshipsId(options: Deleteapiv1reportingrelationshipsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/ReportingRelationships/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}