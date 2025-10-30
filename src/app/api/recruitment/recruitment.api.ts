/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const ListCandidatesResponseSchema = z.object({
    "data": z.array(z.object({
      "id": z.number().int(),
      "name": z.string(),
      "role": z.string(),
      "stage": z.enum(['SCREENING'])
    }))
  });
export type ListCandidatesResponse = z.infer<typeof ListCandidatesResponseSchema>;

export interface ListCandidatesOptions {
  pathParams?: undefined;
  query?: {
    stage?: string | number | boolean;
  };
  body?: undefined;
  headers?: Record<string, string>;
}

const AdvanceCandidateRequestSchema = z.object({
    "candidateId": z.number().int(),
    "stage": z.enum(['INTERVIEW'])
  });
export type AdvanceCandidateRequest = z.infer<typeof AdvanceCandidateRequestSchema>;

const AdvanceCandidateResponseSchema = z.object({
    "stage": z.enum(['INTERVIEW'])
  });
export type AdvanceCandidateResponse = z.infer<typeof AdvanceCandidateResponseSchema>;

export interface AdvanceCandidateOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: AdvanceCandidateRequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class RecruitmentApiService {
  private readonly client = inject(ApiClient);

  listCandidates(options: ListCandidatesOptions = {}): Observable<ListCandidatesResponse> {
    return this.client.request<ListCandidatesResponse>('GET', '/recruitment/candidates', {
      queryParams: options.query,
      responseSchema: ListCandidatesResponseSchema,
      headers: options.headers,
    });
  }
  advanceCandidate(options: AdvanceCandidateOptions = {}): Observable<AdvanceCandidateResponse> {
    return this.client.request<AdvanceCandidateResponse, AdvanceCandidateRequest>('POST', '/recruitment/candidates/advance', {
      body: options.body,
      responseSchema: AdvanceCandidateResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
}