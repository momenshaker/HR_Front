/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createengagementcampaignrequest, Errorresponse, Updateengagementcampaignrequest } from '../models';
export interface Getapiv1engagementcampaignsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1engagementcampaignsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createengagementcampaignrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1engagementcampaignsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1engagementcampaignsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updateengagementcampaignrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1engagementcampaignsidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class EngagementcampaignsApiService {
  private readonly client = inject(ApiClient);

  getApiV1Engagementcampaigns(options: Getapiv1engagementcampaignsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/EngagementCampaigns', {
      headers: options.headers,
    });
  }

  postApiV1Engagementcampaigns(options: Postapiv1engagementcampaignsOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createengagementcampaignrequest>('POST', '/api/v1/EngagementCampaigns', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1EngagementcampaignsId(options: Getapiv1engagementcampaignsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/EngagementCampaigns/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1EngagementcampaignsId(options: Putapiv1engagementcampaignsidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updateengagementcampaignrequest>('PUT', '/api/v1/EngagementCampaigns/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1EngagementcampaignsId(options: Deleteapiv1engagementcampaignsidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/EngagementCampaigns/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}