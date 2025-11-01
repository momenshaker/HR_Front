/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createrecognitionprogramrequest, Errorresponse, Updaterecognitionprogramrequest } from '../models';
export interface Getapiv1recognitionprogramsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1recognitionprogramsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createrecognitionprogramrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1recognitionprogramsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1recognitionprogramsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updaterecognitionprogramrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1recognitionprogramsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class RecognitionprogramsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Recognitionprograms(options: Getapiv1recognitionprogramsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/RecognitionPrograms', {
      headers: options.headers,
    });
  }

  postApiV1Recognitionprograms(options: Postapiv1recognitionprogramsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createrecognitionprogramrequest>('POST', '/api/v1/RecognitionPrograms', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1RecognitionprogramsId(options: Getapiv1recognitionprogramsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/RecognitionPrograms/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1RecognitionprogramsId(options: Putapiv1recognitionprogramsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updaterecognitionprogramrequest>('PUT', '/api/v1/RecognitionPrograms/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1RecognitionprogramsId(options: Deleteapiv1recognitionprogramsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/RecognitionPrograms/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}