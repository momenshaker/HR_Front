/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const LoginRequestSchema = z.object({
    "email": z.string(),
    "password": z.string()
  });
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

const LoginResponseSchema = z.object({
    "token": z.string(),
    "expiresIn": z.number().int(),
    "user": z.object({
      "id": z.number().int(),
      "name": z.string(),
      "roles": z.array(z.enum(['ADMIN']))
    })
  });
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export interface LoginOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: LoginRequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly client = inject(ApiClient);

  login(options: LoginOptions = {}): Observable<LoginResponse> {
    return this.client.request<LoginResponse, LoginRequest>('POST', '/auth/login', {
      body: options.body,
      responseSchema: LoginResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
}