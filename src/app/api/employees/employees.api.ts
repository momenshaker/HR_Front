/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const ListEmployeesResponseSchema = z.object({
    "data": z.array(z.object({
      "id": z.number().int(),
      "firstName": z.string(),
      "lastName": z.string(),
      "department": z.string(),
      "title": z.string(),
      "status": z.enum(['ACTIVE'])
    })),
    "total": z.number().int()
  });
export type ListEmployeesResponse = z.infer<typeof ListEmployeesResponseSchema>;

export interface ListEmployeesOptions {
  pathParams?: undefined;
  query?: {
    departmentId?: string | number | boolean;
    page?: string | number | boolean;
    pageSize?: string | number | boolean;
  };
  body?: undefined;
}

const GetEmployeeDetailsResponseSchema = z.object({
    "id": z.number().int(),
    "firstName": z.string(),
    "lastName": z.string(),
    "email": z.string(),
    "status": z.enum(['ACTIVE']),
    "job": z.object({
      "title": z.string(),
      "department": z.string(),
      "manager": z.string()
    })
  });
export type GetEmployeeDetailsResponse = z.infer<typeof GetEmployeeDetailsResponseSchema>;

export interface GetEmployeeDetailsOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
}

const CreateEmployeeRequestSchema = z.object({
    "firstName": z.string(),
    "lastName": z.string(),
    "email": z.string(),
    "departmentId": z.number().int(),
    "title": z.string()
  });
export type CreateEmployeeRequest = z.infer<typeof CreateEmployeeRequestSchema>;

const CreateEmployeeResponseSchema = z.object({
    "id": z.number().int(),
    "firstName": z.string(),
    "lastName": z.string(),
    "email": z.string(),
    "status": z.enum(['INVITED'])
  });
export type CreateEmployeeResponse = z.infer<typeof CreateEmployeeResponseSchema>;

export interface CreateEmployeeOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: CreateEmployeeRequest;
}

const UpdateEmployeeRequestSchema = z.object({
    "title": z.string(),
    "status": z.enum(['ACTIVE'])
  });
export type UpdateEmployeeRequest = z.infer<typeof UpdateEmployeeRequestSchema>;

const UpdateEmployeeResponseSchema = z.object({
    "id": z.number().int(),
    "title": z.string(),
    "status": z.enum(['ACTIVE'])
  });
export type UpdateEmployeeResponse = z.infer<typeof UpdateEmployeeResponseSchema>;

export interface UpdateEmployeeOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: UpdateEmployeeRequest;
}

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  private readonly client = inject(ApiClient);

  listEmployees(options: ListEmployeesOptions = {}): Observable<ListEmployeesResponse> {
    return this.client.request<ListEmployeesResponse>('GET', '/employees', {
      queryParams: options.query,
      responseSchema: ListEmployeesResponseSchema,
    });
  }
  getEmployeeDetails(options: GetEmployeeDetailsOptions): Observable<GetEmployeeDetailsResponse> {
    return this.client.request<GetEmployeeDetailsResponse>('GET', '/employees/:id', {
      pathParams: options.pathParams,
      responseSchema: GetEmployeeDetailsResponseSchema,
    });
  }
  createEmployee(options: CreateEmployeeOptions = {}): Observable<CreateEmployeeResponse> {
    return this.client.request<CreateEmployeeResponse, CreateEmployeeRequest>('POST', '/employees', {
      body: options.body,
      responseSchema: CreateEmployeeResponseSchema,
    });
  }
  updateEmployee(options: UpdateEmployeeOptions): Observable<UpdateEmployeeResponse> {
    return this.client.request<UpdateEmployeeResponse, UpdateEmployeeRequest>('PUT', '/employees/:id', {
      pathParams: options.pathParams,
      body: options.body,
      responseSchema: UpdateEmployeeResponseSchema,
    });
  }
}