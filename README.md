# HR Frontend

Enterprise Angular application generated from the HR Postman collection. The app bootstraps API clients and feature areas automatically based on the collection metadata and wires UI flows for a human resources platform.

## Project structure

```
src/
  app/
    api/                # Auto-generated API clients (do not edit manually)
    core/               # Application-wide services, interceptors, auth
    shared/             # Reusable UI primitives (forms, tables, loaders)
    features/           # Feature routes aligned with Postman folders
    app.component.ts    # Shell with Material layout
    app.routes.ts       # Standalone route configuration
  assets/
    api/hr-platform.postman_collection.json
```

## Getting started

```bash
npm install
npm start
```

Key scripts:

- `npm run start` – development server
- `npm run build` – production build
- `npm run test` – unit tests (Karma + Jasmine)
- `npm run e2e` – end-to-end tests (Cypress placeholder)
- `npm run api:generate` – regenerate API clients from the Postman collection

The `postinstall` hook automatically regenerates the API layer to keep code in sync with `src/assets/api/hr-platform.postman_collection.json`.

## Postman-driven API generation

The Postman collection is stored under `src/assets/api`. `tools/postman-codegen.mjs` parses the collection and generates:

- Typed Zod schemas and `type` aliases for request/response payloads
- Strongly typed API services with Angular `HttpClient`
- Per-folder service classes and aggregated exports

Generation heuristics infer path/query/body metadata and create helper option interfaces for every request. GET responses are cached in-memory inside `ApiClient` for basic memoization.

## Environments

`src/environments/environment.ts` and `.prod.ts` expose the `apiBaseUrl` value. Update these files to point at the target backend environments.

## Features

Each feature mirrors a Postman folder with standalone components and Material design:

| Feature | Route | Key flows |
|---------|-------|-----------|
| Auth | `/login` | Email/password login, token storage |
| Organization | `/organization` | Department list & CRUD |
| Employees | `/employees` | Directory, profile detail drawer, create employee |
| Time & Attendance | `/time` | Timesheet view, add entry, submit, approve |
| Leave | `/leave` | Balance widget, request workflow, approvals |
| Payroll | `/payroll` | Run history, preview, finalize with confirmation |
| Performance | `/performance` | Review list, scoring form |
| Recruitment | `/recruitment` | Candidate pipeline, stage advancement |
| Training | `/training` | Course catalog and enrollment |
| Communications | `/communications` | Announcement feed, publisher |
| Analytics | `/analytics` | Headcount summary, attrition metrics |

Each page uses Angular Signals for UI state, reactive forms for validation, and shared components for consistent UX.

## Authentication & guards

`AuthService` handles login, token storage (localStorage), and exposes computed signals for guards/interceptors. `authGuard` protects feature routes, while `roleGuard` enables role-based protection when route data supplies role arrays.

## Error handling

`ErrorInterceptor` centralizes HTTP error messaging with Material snackbars and retries idempotent GET requests once. Success toasts are triggered in feature flows via `SnackbarService`.

## Testing

- Unit tests: `ng test` (configuration scaffolded; author your specs under `src/**/*.spec.ts`).
- E2E: `npm run e2e` placeholder to integrate Cypress in follow-up work.

## Extending the app

1. Update the Postman collection under `src/assets/api`.
2. Run `npm run api:generate` to regenerate clients.
3. Scaffold new feature pages under `src/app/features/<folder>` using the generated service.

Generated files contain a banner and should not be edited manually.
