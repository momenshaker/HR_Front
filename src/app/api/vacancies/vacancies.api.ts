/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createvacancyrequest, Errorresponse, Updatevacancyrequest } from '../models';
export interface Getapiv1vacanciesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1vacanciesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createvacancyrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1vacanciesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1vacanciesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updatevacancyrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1vacanciesidcloseOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class VacanciesApiService {
  private readonly client = inject(ApiClient);

  getApiV1Vacancies(options: Getapiv1vacanciesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Vacancies', {
      headers: options.headers,
    });
  }

  postApiV1Vacancies(options: Postapiv1vacanciesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createvacancyrequest>('POST', '/api/v1/Vacancies', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1VacanciesId(options: Getapiv1vacanciesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/Vacancies/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1VacanciesId(options: Putapiv1vacanciesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatevacancyrequest>('PUT', '/api/v1/Vacancies/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1VacanciesIdClose(options: Postapiv1vacanciesidcloseOptions): Observable<unknown> {
    return this.client.request<unknown>('POST', '/api/v1/Vacancies/:id/close', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}