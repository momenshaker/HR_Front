/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const ListDepartmentsResponseSchema = z.object({
    "data": z.array(z.object({
      "id": z.number().int(),
      "name": z.string(),
      "manager": z.string()
    })),
    "total": z.number().int()
  });
export type ListDepartmentsResponse = z.infer<typeof ListDepartmentsResponseSchema>;

export interface ListDepartmentsOptions {
  pathParams?: undefined;
  query?: {
    page?: string | number | boolean;
    pageSize?: string | number | boolean;
  };
  body?: undefined;
}

const CreateDepartmentRequestSchema = z.object({
    "name": z.string(),
    "managerId": z.number().int()
  });
export type CreateDepartmentRequest = z.infer<typeof CreateDepartmentRequestSchema>;

const CreateDepartmentResponseSchema = z.object({
    "id": z.number().int(),
    "name": z.string(),
    "managerId": z.number().int()
  });
export type CreateDepartmentResponse = z.infer<typeof CreateDepartmentResponseSchema>;

export interface CreateDepartmentOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: CreateDepartmentRequest;
}

const UpdateDepartmentRequestSchema = z.object({
    "name": z.string(),
    "managerId": z.number().int()
  });
export type UpdateDepartmentRequest = z.infer<typeof UpdateDepartmentRequestSchema>;

const UpdateDepartmentResponseSchema = z.object({
    "id": z.number().int(),
    "name": z.string(),
    "managerId": z.number().int()
  });
export type UpdateDepartmentResponse = z.infer<typeof UpdateDepartmentResponseSchema>;

export interface UpdateDepartmentOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: UpdateDepartmentRequest;
}

@Injectable({ providedIn: 'root' })
export class OrganizationApiService {
  private readonly client = inject(ApiClient);

  listDepartments(options: ListDepartmentsOptions = {}): Observable<ListDepartmentsResponse> {
    return this.client.request<ListDepartmentsResponse>('GET', '/organization/departments', {
      queryParams: options.query,
      responseSchema: ListDepartmentsResponseSchema,
    });
  }
  createDepartment(options: CreateDepartmentOptions = {}): Observable<CreateDepartmentResponse> {
    return this.client.request<CreateDepartmentResponse, CreateDepartmentRequest>('POST', '/organization/departments', {
      body: options.body,
      responseSchema: CreateDepartmentResponseSchema,
    });
  }
  updateDepartment(options: UpdateDepartmentOptions): Observable<UpdateDepartmentResponse> {
    return this.client.request<UpdateDepartmentResponse, UpdateDepartmentRequest>('PUT', '/organization/departments/:id', {
      pathParams: options.pathParams,
      body: options.body,
      responseSchema: UpdateDepartmentResponseSchema,
    });
  }
}