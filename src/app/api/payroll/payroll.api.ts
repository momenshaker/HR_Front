/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const ListPayrollRunsResponseSchema = z.object({
    "data": z.array(z.object({
      "id": z.number().int(),
      "period": z.string(),
      "status": z.enum(['POSTED'])
    }))
  });
export type ListPayrollRunsResponse = z.infer<typeof ListPayrollRunsResponseSchema>;

export interface ListPayrollRunsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

const PreviewPayrollRequestSchema = z.object({
    "period": z.string()
  });
export type PreviewPayrollRequest = z.infer<typeof PreviewPayrollRequestSchema>;

const PreviewPayrollResponseSchema = z.object({
    "summary": z.object({
      "gross": z.number().int(),
      "net": z.number().int()
    }),
    "employees": z.array(z.object({
      "employeeId": z.number().int(),
      "netPay": z.number().int()
    }))
  });
export type PreviewPayrollResponse = z.infer<typeof PreviewPayrollResponseSchema>;

export interface PreviewPayrollOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: PreviewPayrollRequest;
  headers?: Record<string, string>;
}

const FinalizePayrollRequestSchema = z.object({
    "period": z.string(),
    "approve": z.boolean()
  });
export type FinalizePayrollRequest = z.infer<typeof FinalizePayrollRequestSchema>;

const FinalizePayrollResponseSchema = z.object({
    "status": z.enum(['POSTED'])
  });
export type FinalizePayrollResponse = z.infer<typeof FinalizePayrollResponseSchema>;

export interface FinalizePayrollOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: FinalizePayrollRequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class PayrollApiService {
  private readonly client = inject(ApiClient);

  listPayrollRuns(options: ListPayrollRunsOptions = {}): Observable<ListPayrollRunsResponse> {
    return this.client.request<ListPayrollRunsResponse>('GET', '/payroll/runs', {
      responseSchema: ListPayrollRunsResponseSchema,
      headers: options.headers,
    });
  }
  previewPayroll(options: PreviewPayrollOptions = {}): Observable<PreviewPayrollResponse> {
    return this.client.request<PreviewPayrollResponse, PreviewPayrollRequest>('POST', '/payroll/preview', {
      body: options.body,
      responseSchema: PreviewPayrollResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
  finalizePayroll(options: FinalizePayrollOptions = {}): Observable<FinalizePayrollResponse> {
    return this.client.request<FinalizePayrollResponse, FinalizePayrollRequest>('POST', '/payroll/finalize', {
      body: options.body,
      responseSchema: FinalizePayrollResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
}