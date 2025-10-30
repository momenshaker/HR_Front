/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const ListCoursesResponseSchema = z.object({
    "data": z.array(z.object({
      "id": z.number().int(),
      "title": z.string(),
      "status": z.enum(['OPEN'])
    }))
  });
export type ListCoursesResponse = z.infer<typeof ListCoursesResponseSchema>;

export interface ListCoursesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

const EnrollCourseRequestSchema = z.object({
    "courseId": z.number().int()
  });
export type EnrollCourseRequest = z.infer<typeof EnrollCourseRequestSchema>;

const EnrollCourseResponseSchema = z.object({
    "status": z.enum(['ENROLLED'])
  });
export type EnrollCourseResponse = z.infer<typeof EnrollCourseResponseSchema>;

export interface EnrollCourseOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: EnrollCourseRequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class TrainingApiService {
  private readonly client = inject(ApiClient);

  listCourses(options: ListCoursesOptions = {}): Observable<ListCoursesResponse> {
    return this.client.request<ListCoursesResponse>('GET', '/training/courses', {
      responseSchema: ListCoursesResponseSchema,
      headers: options.headers,
    });
  }
  enrollCourse(options: EnrollCourseOptions = {}): Observable<EnrollCourseResponse> {
    return this.client.request<EnrollCourseResponse, EnrollCourseRequest>('POST', '/training/enroll', {
      body: options.body,
      responseSchema: EnrollCourseResponseSchema,
      headers: {
        ...(options.headers ?? {}),
        "Content-Type": "application/json",
      },
    });
  }
}