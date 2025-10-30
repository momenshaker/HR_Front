import { HttpClient, HttpContext, HttpContextToken, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { ZodTypeAny } from 'zod';
import { APP_CONFIG } from '../config/app-config.provider';

export const API_RETRY = new HttpContextToken<boolean>(() => false);

export interface RequestOptions<TBody = unknown> {
  pathParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean | undefined | null>;
  body?: TBody;
  headers?: Record<string, string>;
  responseSchema?: ZodTypeAny;
}

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly cache = new Map<string, Observable<unknown>>();

  request<TResponse = unknown, TBody = unknown>(
    method: string,
    path: string,
    options: RequestOptions<TBody> = {}
  ): Observable<TResponse> {
    const url = this.resolveUrl(path, options.pathParams);
    const params = this.createParams(options.queryParams);
    const headers = this.createHeaders(options.headers);
    const cacheKey = this.buildCacheKey(method, url, params);

    if (cacheKey && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as Observable<TResponse>;
    }

    const context = this.createContext(method);

    const request$ = this.http
      .request<TResponse>(method, url, {
        body: options.body,
        params,
        headers,
        context,
        responseType: 'json'
      })
      .pipe(map((response) => this.parseResponse<TResponse>(response, options.responseSchema)));

    if (cacheKey) {
      const shared$ = request$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
      this.cache.set(cacheKey, shared$);
      return shared$;
    }

    if (method.toUpperCase() !== 'GET') {
      this.cache.clear();
    }

    return request$;
  }

  private resolveUrl(path: string, pathParams?: Record<string, string | number>): string {
    if (!pathParams) {
      return `${this.config.apiBaseUrl}${path}`;
    }
    const resolved = Object.entries(pathParams).reduce((acc, [key, value]) => {
      return acc.replace(`:${key}`, encodeURIComponent(String(value)));
    }, path);
    return `${this.config.apiBaseUrl}${resolved}`;
  }

  private createParams(query?: Record<string, string | number | boolean | undefined | null>): HttpParams | undefined {
    if (!query) {
      return undefined;
    }
    const filtered = Object.entries(query).filter(([, value]) => value !== undefined && value !== null);
    if (filtered.length === 0) {
      return undefined;
    }
    let params = new HttpParams();
    for (const [key, value] of filtered) {
      params = params.append(key, String(value));
    }
    return params;
  }

  private createHeaders(headers?: Record<string, string>): HttpHeaders | undefined {
    if (!headers || Object.keys(headers).length === 0) {
      return undefined;
    }
    return new HttpHeaders(headers);
  }

  private createContext(method: string): HttpContext | undefined {
    if (method.toUpperCase() !== 'GET') {
      return undefined;
    }
    return new HttpContext().set(API_RETRY, true);
  }

  private parseResponse<TResponse>(value: unknown, schema?: ZodTypeAny): TResponse {
    if (!schema) {
      return value as TResponse;
    }
    return schema.parse(value) as TResponse;
  }

  private buildCacheKey(method: string, url: string, params?: HttpParams): string | null {
    if (method.toUpperCase() !== 'GET') {
      return null;
    }
    const serializedParams = params ? params.toString() : '';
    return `${method.toUpperCase()}::${url}?${serializedParams}`;
  }
}
