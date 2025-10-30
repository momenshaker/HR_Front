/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const ListReviewsResponseSchema = z.object({
    "data": z.array(z.object({
      "id": z.number().int(),
      "employee": z.string(),
      "period": z.string(),
      "status": z.enum(['IN_PROGRESS'])
    }))
  });
export type ListReviewsResponse = z.infer<typeof ListReviewsResponseSchema>;

export interface ListReviewsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

const SubmitReviewRequestSchema = z.object({
    "reviewId": z.number().int(),
    "scores": z.object({
      "teamwork": z.number().int(),
      "delivery": z.number().int()
    }),
    "summary": z.string()
  });
export type SubmitReviewRequest = z.infer<typeof SubmitReviewRequestSchema>;

const SubmitReviewResponseSchema = z.object({
    "status": z.enum(['SUBMITTED'])
  });
export type SubmitReviewResponse = z.infer<typeof SubmitReviewResponseSchema>;

export interface SubmitReviewOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: SubmitReviewRequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class PerformanceApiService {
  private readonly client = inject(ApiClient);

  listReviews(options: ListReviewsOptions = {}): Observable<ListReviewsResponse> {
    return this.client.request<ListReviewsResponse>('GET', '/performance/reviews', {
      responseSchema: ListReviewsResponseSchema,
      headers: options.headers,
    });
  }
  submitReview(options: SubmitReviewOptions = {}): Observable<SubmitReviewResponse> {
    return this.client.request<SubmitReviewResponse, SubmitReviewRequest>('POST', '/performance/reviews/submit', {
      body: options.body,
      responseSchema: SubmitReviewResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
}