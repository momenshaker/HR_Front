import { HttpClient, HttpContext, HttpContextToken, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, finalize, map, shareReplay } from 'rxjs';
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
    const headers = this.createHeaders(method, options.headers);
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
      const shared$ = request$.pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        finalize(() => {
          if (this.cache.get(cacheKey) === shared$) {
            this.cache.delete(cacheKey);
          }
        })
      );
      this.cache.set(cacheKey, shared$);
      return shared$;
    }

    if (method.toUpperCase() !== 'GET') {
      this.cache.clear();
    }

    return request$;
  }

  private resolveUrl(path: string, pathParams?: Record<string, string | number>): string {
    const resolvedPath = pathParams
      ? Object.entries(pathParams).reduce((acc, [key, value]) => {
        return acc.replace(`:${key}`, encodeURIComponent(String(value)));
      }, path)
      : path;

    return joinUrl(this.config.apiBaseUrl, resolvedPath);
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

  private createHeaders(method: string, headers?: Record<string, string>): HttpHeaders | undefined {
    const defaultHeaders = this.config.defaultHeaders ?? {};
    const combined = { ...defaultHeaders, ...(headers ?? {}) };
    const entries = Object.entries(combined).filter(([, value]) => value !== undefined && value !== null);
    if (entries.length === 0) {
      return undefined;
    }
    const headerRecord = Object.fromEntries(entries);

    if (method.toUpperCase() !== 'GET' && headerRecord['Idempotency-Key']) {
      headerRecord['Idempotency-Key'] = generateIdempotencyKey();
    }

    return new HttpHeaders(headerRecord);
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
    const result = schema.safeParse(value);
    if (!result.success) {
      console.warn('Failed to validate API response', result.error, value);
      return value as TResponse;
    }
    return result.data as TResponse;
  }

  private buildCacheKey(method: string, url: string, params?: HttpParams): string | null {
    if (method.toUpperCase() !== 'GET') {
      return null;
    }
    const serializedParams = params ? params.toString() : '';
    return `${method.toUpperCase()}::${url}?${serializedParams}`;
  }
}

function generateIdempotencyKey(): string {
  const globalCrypto = typeof globalThis !== 'undefined' ? (globalThis as { crypto?: Crypto }).crypto : undefined;
  if (globalCrypto?.randomUUID) {
    return globalCrypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, '');
  const normalizedPath = path.replace(/^\/+/, '');

  if (!normalizedBase) {
    return `/${normalizedPath}`;
  }

  if (!normalizedPath) {
    return normalizedBase;
  }

  return `${normalizedBase}/${normalizedPath}`;
}
