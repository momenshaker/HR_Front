/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Changepasswordrequest, Confirmemailrequest, Errorresponse, Forgotpasswordrequest, Lockoutrequest, Loginrequest, Refreshrequest, Registeremployeerequest, Registeruserrequest, Resendconfirmationrequest, Resetpasswordrequest, Updateuserclaimsrequest, Updateuserrolesrequest } from '../models';
export interface Postapiv1authloginOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Loginrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authregisteremployeeOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Registeremployeerequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authrefreshOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Refreshrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1authmeOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1authlinkemployeeOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Registeremployeerequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authregisterOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Registeruserrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authconfirmemailOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Confirmemailrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authresendconfirmationOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Resendconfirmationrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authforgotpasswordOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Forgotpasswordrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authresetpasswordOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Resetpasswordrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authchangepasswordOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Changepasswordrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1authusersuseridrolesOptions {
  pathParams: {
    userId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1authusersuseridrolesOptions {
  pathParams: {
    userId: string | number;
  };
  query?: undefined;
  body?: Updateuserrolesrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1authusersuseridrolesOptions {
  pathParams: {
    userId: string | number;
  };
  query?: undefined;
  body?: Updateuserrolesrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1authusersuseridclaimsOptions {
  pathParams: {
    userId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1authusersuseridclaimsOptions {
  pathParams: {
    userId: string | number;
  };
  query?: undefined;
  body?: Updateuserclaimsrequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1authusersuseridclaimsOptions {
  pathParams: {
    userId: string | number;
  };
  query?: undefined;
  body?: Updateuserclaimsrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1authusersuseridlockoutOptions {
  pathParams: {
    userId: string | number;
  };
  query?: undefined;
  body?: Lockoutrequest;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly client = inject(ApiClient);

  postApiV1AuthLogin(options: Postapiv1authloginOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Loginrequest>('POST', '/api/v1/auth/login', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthRegisterEmployee(options: Postapiv1authregisteremployeeOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Registeremployeerequest>('POST', '/api/v1/auth/register-employee', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthRefresh(options: Postapiv1authrefreshOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Refreshrequest>('POST', '/api/v1/auth/refresh', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1AuthMe(options: Getapiv1authmeOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/auth/me', {
      headers: options.headers,
    });
  }

  postApiV1AuthLinkEmployee(options: Postapiv1authlinkemployeeOptions = {}): Observable<unknown> {
    return this.client.request<unknown, Registeremployeerequest>('POST', '/api/v1/auth/link-employee', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthRegister(options: Postapiv1authregisterOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Registeruserrequest>('POST', '/api/v1/auth/register', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthConfirmEmail(options: Postapiv1authconfirmemailOptions = {}): Observable<unknown> {
    return this.client.request<unknown, Confirmemailrequest>('POST', '/api/v1/auth/confirm-email', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthResendConfirmation(options: Postapiv1authresendconfirmationOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Resendconfirmationrequest>('POST', '/api/v1/auth/resend-confirmation', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthForgotPassword(options: Postapiv1authforgotpasswordOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Forgotpasswordrequest>('POST', '/api/v1/auth/forgot-password', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthResetPassword(options: Postapiv1authresetpasswordOptions = {}): Observable<unknown> {
    return this.client.request<unknown, Resetpasswordrequest>('POST', '/api/v1/auth/reset-password', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthChangePassword(options: Postapiv1authchangepasswordOptions = {}): Observable<unknown> {
    return this.client.request<unknown, Changepasswordrequest>('POST', '/api/v1/auth/change-password', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1AuthUsersUseridRoles(options: Getapiv1authusersuseridrolesOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/auth/users/:userId/roles', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1AuthUsersUseridRoles(options: Postapiv1authusersuseridrolesOptions): Observable<unknown> {
    return this.client.request<unknown, Updateuserrolesrequest>('POST', '/api/v1/auth/users/:userId/roles', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1AuthUsersUseridRoles(options: Deleteapiv1authusersuseridrolesOptions): Observable<unknown> {
    return this.client.request<unknown, Updateuserrolesrequest>('DELETE', '/api/v1/auth/users/:userId/roles', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1AuthUsersUseridClaims(options: Getapiv1authusersuseridclaimsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/auth/users/:userId/claims', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1AuthUsersUseridClaims(options: Postapiv1authusersuseridclaimsOptions): Observable<unknown> {
    return this.client.request<unknown, Updateuserclaimsrequest>('POST', '/api/v1/auth/users/:userId/claims', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1AuthUsersUseridClaims(options: Deleteapiv1authusersuseridclaimsOptions): Observable<unknown> {
    return this.client.request<unknown, Updateuserclaimsrequest>('DELETE', '/api/v1/auth/users/:userId/claims', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1AuthUsersUseridLockout(options: Postapiv1authusersuseridlockoutOptions): Observable<unknown> {
    return this.client.request<unknown, Lockoutrequest>('POST', '/api/v1/auth/users/:userId/lockout', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

}