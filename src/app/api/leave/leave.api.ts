/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const ListLeaveBalancesResponseSchema = z.object({
    "vacation": z.number().int(),
    "sick": z.number().int()
  });
export type ListLeaveBalancesResponse = z.infer<typeof ListLeaveBalancesResponseSchema>;

export interface ListLeaveBalancesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

const RequestLeaveRequestSchema = z.object({
    "type": z.enum(['VACATION']),
    "startDate": z.string().datetime({ offset: true }).or(z.string()),
    "endDate": z.string().datetime({ offset: true }).or(z.string()),
    "reason": z.string()
  });
export type RequestLeaveRequest = z.infer<typeof RequestLeaveRequestSchema>;

const RequestLeaveResponseSchema = z.object({
    "id": z.number().int(),
    "status": z.enum(['PENDING_APPROVAL'])
  });
export type RequestLeaveResponse = z.infer<typeof RequestLeaveResponseSchema>;

export interface RequestLeaveOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: RequestLeaveRequest;
  headers?: Record<string, string>;
}

const ApproveLeaveRequestSchema = z.object({
    "requestId": z.number().int(),
    "decision": z.enum(['APPROVED']),
    "comment": z.string()
  });
export type ApproveLeaveRequest = z.infer<typeof ApproveLeaveRequestSchema>;

const ApproveLeaveResponseSchema = z.object({
    "status": z.enum(['APPROVED'])
  });
export type ApproveLeaveResponse = z.infer<typeof ApproveLeaveResponseSchema>;

export interface ApproveLeaveOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: ApproveLeaveRequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class LeaveApiService {
  private readonly client = inject(ApiClient);

  listLeaveBalances(options: ListLeaveBalancesOptions = {}): Observable<ListLeaveBalancesResponse> {
    return this.client.request<ListLeaveBalancesResponse>('GET', '/leave/balances', {
      responseSchema: ListLeaveBalancesResponseSchema,
      headers: options.headers,
    });
  }
  requestLeave(options: RequestLeaveOptions = {}): Observable<RequestLeaveResponse> {
    return this.client.request<RequestLeaveResponse, RequestLeaveRequest>('POST', '/leave/requests', {
      body: options.body,
      responseSchema: RequestLeaveResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
  approveLeave(options: ApproveLeaveOptions = {}): Observable<ApproveLeaveResponse> {
    return this.client.request<ApproveLeaveResponse, ApproveLeaveRequest>('POST', '/leave/requests/approve', {
      body: options.body,
      responseSchema: ApproveLeaveResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
}