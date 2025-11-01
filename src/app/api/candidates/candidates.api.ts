/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Advancecandidaterequest, Createcandidaterequest, Errorresponse, Updatecandidaterequest } from '../models';
export interface Getapiv1candidatesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1candidatesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createcandidaterequest;
  headers?: Record<string, string>;
}

export interface Getapiv1candidatesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1candidatesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updatecandidaterequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1candidatesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1candidatesidadvanceOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Advancecandidaterequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class CandidatesApiService {
  private readonly client = inject(ApiClient);

  getApiV1Candidates(options: Getapiv1candidatesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Candidates', {
      headers: options.headers,
    });
  }

  postApiV1Candidates(options: Postapiv1candidatesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createcandidaterequest>('POST', '/api/v1/Candidates', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1CandidatesId(options: Getapiv1candidatesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Candidates/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1CandidatesId(options: Putapiv1candidatesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatecandidaterequest>('PUT', '/api/v1/Candidates/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1CandidatesId(options: Deleteapiv1candidatesidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/Candidates/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1CandidatesIdAdvance(options: Postapiv1candidatesidadvanceOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Advancecandidaterequest>('POST', '/api/v1/Candidates/:id/advance', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

}