/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const GetHeadcountSummaryResponseSchema = z.object({
    "total": z.number().int(),
    "departments": z.array(z.object({
      "name": z.string(),
      "headcount": z.number().int()
    }))
  });
export type GetHeadcountSummaryResponse = z.infer<typeof GetHeadcountSummaryResponseSchema>;

export interface GetHeadcountSummaryOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

const GetAttritionResponseSchema = z.object({
    "rate": z.number()
  });
export type GetAttritionResponse = z.infer<typeof GetAttritionResponseSchema>;

export interface GetAttritionOptions {
  pathParams?: undefined;
  query?: {
    year?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsApiService {
  private readonly client = inject(ApiClient);

  getHeadcountSummary(options: GetHeadcountSummaryOptions = {}): Observable<GetHeadcountSummaryResponse> {
    return this.client.request<GetHeadcountSummaryResponse>('GET', '/analytics/headcount', {
      responseSchema: GetHeadcountSummaryResponseSchema,
      headers: options.headers,
    });
  }
  getAttrition(options: GetAttritionOptions = {}): Observable<GetAttritionResponse> {
    return this.client.request<GetAttritionResponse>('GET', '/analytics/attrition', {
      queryParams: options.query,
      responseSchema: GetAttritionResponseSchema,
      headers: options.headers,
    });
  }
}