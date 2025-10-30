/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const DepartmentDtoSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
    parentDepartmentId: z.string().uuid().nullable().optional(),
    parentDepartmentName: z.string().nullable().optional(),
    managerId: z.string().uuid().nullable().optional(),
    managerName: z.string().nullable().optional(),
    branch: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    isActive: z.boolean(),
  })
  .passthrough();
export type DepartmentDto = z.infer<typeof DepartmentDtoSchema>;

const ListDepartmentsResponseSchema = z.array(DepartmentDtoSchema);
export type ListDepartmentsResponse = z.infer<typeof ListDepartmentsResponseSchema>;

export interface ListDepartmentsOptions {
  headers?: Record<string, string>;
}

const CreateDepartmentRequestSchema = z
  .object({
    name: z.string().max(150),
    code: z.string().max(20),
    parentDepartmentId: z.string().uuid().nullable().optional(),
    managerId: z.string().uuid().nullable().optional(),
    branch: z.string().max(100).nullable().optional(),
    location: z.string().max(200).nullable().optional(),
    description: z.string().max(500).nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .strict();
export type CreateDepartmentRequest = z.infer<typeof CreateDepartmentRequestSchema>;

export interface CreateDepartmentOptions {
  body?: CreateDepartmentRequest;
  headers?: Record<string, string>;
}

const UpdateDepartmentRequestSchema = z
  .object({
    name: z.string().max(150),
    code: z.string().max(20),
    parentDepartmentId: z.string().uuid().nullable().optional(),
    managerId: z.string().uuid().nullable().optional(),
    branch: z.string().max(100).nullable().optional(),
    location: z.string().max(200).nullable().optional(),
    description: z.string().max(500).nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .strict();
export type UpdateDepartmentRequest = z.infer<typeof UpdateDepartmentRequestSchema>;

export interface GetDepartmentOptions {
  pathParams: {
    id: string;
  };
  headers?: Record<string, string>;
}

export interface UpdateDepartmentOptions {
  pathParams: {
    id: string;
  };
  body?: UpdateDepartmentRequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class OrganizationApiService {
  private readonly client = inject(ApiClient);

  listDepartments(options: ListDepartmentsOptions = {}): Observable<ListDepartmentsResponse> {
    return this.client.request<ListDepartmentsResponse>('GET', '/api/v1/Departments', {
      responseSchema: ListDepartmentsResponseSchema,
      headers: options.headers,
    });
  }

  createDepartment(options: CreateDepartmentOptions = {}): Observable<DepartmentDto> {
    return this.client.request<DepartmentDto, CreateDepartmentRequest>('POST', '/api/v1/Departments', {
      body: options.body,
      responseSchema: DepartmentDtoSchema,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getDepartment(options: GetDepartmentOptions): Observable<DepartmentDto> {
    return this.client.request<DepartmentDto>('GET', '/api/v1/Departments/:id', {
      pathParams: options.pathParams,
      responseSchema: DepartmentDtoSchema,
      headers: options.headers,
    });
  }

  updateDepartment(options: UpdateDepartmentOptions): Observable<DepartmentDto> {
    return this.client.request<DepartmentDto, UpdateDepartmentRequest>('PUT', '/api/v1/Departments/:id', {
      pathParams: options.pathParams,
      body: options.body,
      responseSchema: DepartmentDtoSchema,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }
}
