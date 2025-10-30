/* eslint-disable */
/* Auto-generated from Postman collection. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';
import { z } from 'zod';

const ListAnnouncementsResponseSchema = z.object({
    "data": z.array(z.object({
      "id": z.number().int(),
      "title": z.string(),
      "publishedAt": z.string().datetime({ offset: true }).or(z.string())
    }))
  });
export type ListAnnouncementsResponse = z.infer<typeof ListAnnouncementsResponseSchema>;

export interface ListAnnouncementsOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
}

const PublishAnnouncementRequestSchema = z.object({
    "title": z.string(),
    "body": z.string()
  });
export type PublishAnnouncementRequest = z.infer<typeof PublishAnnouncementRequestSchema>;

const PublishAnnouncementResponseSchema = z.object({
    "id": z.number().int(),
    "status": z.enum(['PUBLISHED'])
  });
export type PublishAnnouncementResponse = z.infer<typeof PublishAnnouncementResponseSchema>;

export interface PublishAnnouncementOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: PublishAnnouncementRequest;
}

@Injectable({ providedIn: 'root' })
export class CommunicationsApiService {
  private readonly client = inject(ApiClient);

  listAnnouncements(options: ListAnnouncementsOptions = {}): Observable<ListAnnouncementsResponse> {
    return this.client.request<ListAnnouncementsResponse>('GET', '/communications/announcements', {
      responseSchema: ListAnnouncementsResponseSchema,
    });
  }
  publishAnnouncement(options: PublishAnnouncementOptions = {}): Observable<PublishAnnouncementResponse> {
    return this.client.request<PublishAnnouncementResponse, PublishAnnouncementRequest>('POST', '/communications/announcements', {
      body: options.body,
      responseSchema: PublishAnnouncementResponseSchema,
    });
  }
}