/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

export interface Postapiv1billingwebhooksstripeOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class BillingwebhooksApiService {
  private readonly client = inject(ApiClient);

  postApiV1BillingWebhooksStripe(options: Postapiv1billingwebhooksstripeOptions = {}): Observable<unknown> {
    return this.client.request<unknown>('POST', '/api/v1/billing/webhooks/stripe', {
      headers: options.headers,
    });
  }

}