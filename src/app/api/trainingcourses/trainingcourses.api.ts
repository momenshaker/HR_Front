/* eslint-disable */
/* Auto-generated from OpenAPI spec. Do not edit manually. */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../core/http/api-client.service';

import type { Createcourseenrollmentrequest, Createtrainingcourserequest, Errorresponse, Issuecoursecertificationrequest, Revokecoursecertificationrequest, Updatecourseenrollmentprogressrequest, Updatetrainingcourserequest } from '../models';
export interface Getapiv1trainingcoursesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1trainingcoursesOptions {
  pathParams?: undefined;
  query?: undefined;
  body?: Createtrainingcourserequest;
  headers?: Record<string, string>;
}

export interface Getapiv1trainingcoursescompetencycompetencycodeOptions {
  pathParams: {
    competencyCode: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1trainingcoursesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Putapiv1trainingcoursesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: Updatetrainingcourserequest;
  headers?: Record<string, string>;
}

export interface Deleteapiv1trainingcoursesidOptions {
  pathParams: {
    id: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1trainingcoursescourseidenrollmentsOptions {
  pathParams: {
    courseId: string | number;
  };
  query?: undefined;
  body?: Createcourseenrollmentrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1trainingcoursescourseidenrollmentsOptions {
  pathParams: {
    courseId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1trainingcoursesenrollmentsemployeeemployeeidOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Patchapiv1trainingcoursesenrollmentsenrollmentidprogressOptions {
  pathParams: {
    enrollmentId: string | number;
  };
  query?: undefined;
  body?: Updatecourseenrollmentprogressrequest;
  headers?: Record<string, string>;
}

export interface Postapiv1trainingcoursesenrollmentsenrollmentidwithdrawOptions {
  pathParams: {
    enrollmentId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Getapiv1trainingcoursescourseidanalyticsOptions {
  pathParams: {
    courseId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1trainingcoursescourseidcertificationsOptions {
  pathParams: {
    courseId: string | number;
  };
  query?: undefined;
  body?: Issuecoursecertificationrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1trainingcoursescourseidcertificationsOptions {
  pathParams: {
    courseId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

export interface Postapiv1trainingcoursescertificationscertificationidrevokeOptions {
  pathParams: {
    certificationId: string | number;
  };
  query?: undefined;
  body?: Revokecoursecertificationrequest;
  headers?: Record<string, string>;
}

export interface Getapiv1trainingcoursescertificationsemployeeemployeeidOptions {
  pathParams: {
    employeeId: string | number;
  };
  query?: undefined;
  body?: undefined;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class TrainingcoursesApiService {
  private readonly client = inject(ApiClient);

  getApiV1Trainingcourses(options: Getapiv1trainingcoursesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/TrainingCourses', {
      headers: options.headers,
    });
  }

  postApiV1Trainingcourses(options: Postapiv1trainingcoursesOptions = {}): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createtrainingcourserequest>('POST', '/api/v1/TrainingCourses', {
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1TrainingcoursesCompetencyCompetencycode(options: Getapiv1trainingcoursescompetencycompetencycodeOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/TrainingCourses/competency/:competencyCode', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1TrainingcoursesId(options: Getapiv1trainingcoursesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/TrainingCourses/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  putApiV1TrainingcoursesId(options: Putapiv1trainingcoursesidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatetrainingcourserequest>('PUT', '/api/v1/TrainingCourses/:id', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteApiV1TrainingcoursesId(options: Deleteapiv1trainingcoursesidOptions): Observable<unknown> {
    return this.client.request<unknown>('DELETE', '/api/v1/TrainingCourses/:id', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1TrainingcoursesCourseidEnrollments(options: Postapiv1trainingcoursescourseidenrollmentsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Createcourseenrollmentrequest>('POST', '/api/v1/TrainingCourses/:courseId/enrollments', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1TrainingcoursesCourseidEnrollments(options: Getapiv1trainingcoursescourseidenrollmentsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/TrainingCourses/:courseId/enrollments', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1TrainingcoursesEnrollmentsEmployeeEmployeeid(options: Getapiv1trainingcoursesenrollmentsemployeeemployeeidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/TrainingCourses/enrollments/employee/:employeeId', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  patchApiV1TrainingcoursesEnrollmentsEnrollmentidProgress(options: Patchapiv1trainingcoursesenrollmentsenrollmentidprogressOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Updatecourseenrollmentprogressrequest>('PATCH', '/api/v1/TrainingCourses/enrollments/:enrollmentId/progress', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  postApiV1TrainingcoursesEnrollmentsEnrollmentidWithdraw(options: Postapiv1trainingcoursesenrollmentsenrollmentidwithdrawOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('POST', '/api/v1/TrainingCourses/enrollments/:enrollmentId/withdraw', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  getApiV1TrainingcoursesCourseidAnalytics(options: Getapiv1trainingcoursescourseidanalyticsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/TrainingCourses/:courseId/analytics', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1TrainingcoursesCourseidCertifications(options: Postapiv1trainingcoursescourseidcertificationsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Issuecoursecertificationrequest>('POST', '/api/v1/TrainingCourses/:courseId/certifications', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1TrainingcoursesCourseidCertifications(options: Getapiv1trainingcoursescourseidcertificationsOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/TrainingCourses/:courseId/certifications', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

  postApiV1TrainingcoursesCertificationsCertificationidRevoke(options: Postapiv1trainingcoursescertificationscertificationidrevokeOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse, Revokecoursecertificationrequest>('POST', '/api/v1/TrainingCourses/certifications/:certificationId/revoke', {
      pathParams: options.pathParams,
      body: options.body,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
    });
  }

  getApiV1TrainingcoursesCertificationsEmployeeEmployeeid(options: Getapiv1trainingcoursescertificationsemployeeemployeeidOptions): Observable<Errorresponse> {
    return this.client.request<Errorresponse>('GET', '/api/v1/TrainingCourses/certifications/employee/:employeeId', {
      pathParams: options.pathParams,
      headers: options.headers,
    });
  }

}