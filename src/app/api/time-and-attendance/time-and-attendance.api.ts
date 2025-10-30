/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const GetTimesheetResponseSchema = z.object({
    "weekStart": z.string().datetime({ offset: true }).or(z.string()),
    "entries": z.array(z.object({
      "id": z.number().int(),
      "date": z.string().datetime({ offset: true }).or(z.string()),
      "hours": z.number().int(),
      "project": z.string(),
      "status": z.enum(['SUBMITTED'])
    }))
  });
export type GetTimesheetResponse = z.infer<typeof GetTimesheetResponseSchema>;

export interface GetTimesheetOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

const CreateTimeEntryRequestSchema = z.object({
    "date": z.string().datetime({ offset: true }).or(z.string()),
    "hours": z.number().int(),
    "project": z.string()
  });
export type CreateTimeEntryRequest = z.infer<typeof CreateTimeEntryRequestSchema>;

const CreateTimeEntryResponseSchema = z.object({
    "id": z.number().int(),
    "status": z.enum(['DRAFT'])
  });
export type CreateTimeEntryResponse = z.infer<typeof CreateTimeEntryResponseSchema>;

export interface CreateTimeEntryOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: CreateTimeEntryRequest;
  headers?: Record<string, string>;
}

const SubmitTimesheetRequestSchema = z.object({
    "weekStart": z.string().datetime({ offset: true }).or(z.string()),
    "entries": z.array(z.object({
      "date": z.string().datetime({ offset: true }).or(z.string()),
      "hours": z.number().int(),
      "project": z.string()
    }))
  });
export type SubmitTimesheetRequest = z.infer<typeof SubmitTimesheetRequestSchema>;

const SubmitTimesheetResponseSchema = z.object({
    "status": z.enum(['SUBMITTED'])
  });
export type SubmitTimesheetResponse = z.infer<typeof SubmitTimesheetResponseSchema>;

export interface SubmitTimesheetOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: SubmitTimesheetRequest;
  headers?: Record<string, string>;
}

const ApproveTimesheetRequestSchema = z.object({
    "timesheetId": z.number().int(),
    "decision": z.enum(['APPROVED'])
  });
export type ApproveTimesheetRequest = z.infer<typeof ApproveTimesheetRequestSchema>;

const ApproveTimesheetResponseSchema = z.object({
    "status": z.enum(['APPROVED'])
  });
export type ApproveTimesheetResponse = z.infer<typeof ApproveTimesheetResponseSchema>;

export interface ApproveTimesheetOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: ApproveTimesheetRequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class TimeAttendanceApiService {
  private readonly client = inject(ApiClient);

  getTimesheet(options: GetTimesheetOptions = {}): Observable<GetTimesheetResponse> {
    return this.client.request<GetTimesheetResponse>('GET', '/time/timesheets/current', {
      responseSchema: GetTimesheetResponseSchema,
      headers: options.headers,
    });
  }
  createTimeEntry(options: CreateTimeEntryOptions = {}): Observable<CreateTimeEntryResponse> {
    return this.client.request<CreateTimeEntryResponse, CreateTimeEntryRequest>('POST', '/time/entries', {
      body: options.body,
      responseSchema: CreateTimeEntryResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
  submitTimesheet(options: SubmitTimesheetOptions = {}): Observable<SubmitTimesheetResponse> {
    return this.client.request<SubmitTimesheetResponse, SubmitTimesheetRequest>('POST', '/time/timesheets/submit', {
      body: options.body,
      responseSchema: SubmitTimesheetResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
  approveTimesheet(options: ApproveTimesheetOptions = {}): Observable<ApproveTimesheetResponse> {
    return this.client.request<ApproveTimesheetResponse, ApproveTimesheetRequest>('POST', '/time/timesheets/approve', {
      body: options.body,
      responseSchema: ApproveTimesheetResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
}