/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createpulsesurveyrequest, Errorresponse, Updatepulsesurveyrequest } from '../models';
export interface Getapiv1pulsesurveysOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1pulsesurveysOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createpulsesurveyrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1pulsesurveysidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1pulsesurveysidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updatepulsesurveyrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1pulsesurveysidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class PulsesurveysApiService {
  private readonly client = inject(ApiClient);

  getApiV1Pulsesurveys(options: Getapiv1pulsesurveysOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/PulseSurveys', {
      headers: options.headers,
    });
  }

  postApiV1Pulsesurveys(options: Postapiv1pulsesurveysOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createpulsesurveyrequest>('POST', '/api/v1/PulseSurveys', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1PulsesurveysId(options: Getapiv1pulsesurveysidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/PulseSurveys/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1PulsesurveysId(options: Putapiv1pulsesurveysidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatepulsesurveyrequest>('PUT', '/api/v1/PulseSurveys/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1PulsesurveysId(options: Deleteapiv1pulsesurveysidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/PulseSurveys/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}