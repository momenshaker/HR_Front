/* eslint-disable */
/* Auto-generated models from OpenAPI spec. Do not edit manually. */
export interface Advancecandidaterequest {
  TargetStage: string;
  NextFollowUpAtUtc?: string;
  Notes?: string;
  Interview?: Scheduleinterviewrequest;
}

export interface Analyticssnapshotdto {
  Id?: string;
  CapturedAtUtc?: string;
  Headcount?: number;
  TurnoverRate?: number;
  AverageTenureMonths?: number;
  HiringVelocity?: number;
  EngagementScore?: number;
  Commentary?: string;
}

export interface Announcementdto {
  Id?: string;
  Title?: string;
  Message?: string;
  Audience?: string;
  CreatedBy?: string;
  PublishedAtUtc?: string;
  RequiresAcknowledgement?: boolean;
}

export interface Approvetimesheetrequest {
  ManagerId?: string;
  Notes?: string;
}

export interface Attendancerecorddto {
  Id?: string;
  EmployeeId?: string;
  WorkDate?: string;
  ShiftName?: string;
  ClockInUtc?: string;
  ClockOutUtc?: string;
  OvertimeMinutes?: number;
  Status?: string;
  Notes?: string;
}

export interface Authresponse {
  AccessToken?: string;
  TokenType?: string;
  ExpiresIn?: number;
  RefreshToken?: string;
}

export interface Candidatedto {
  Id?: string;
  FullName?: string;
  Email?: string;
  AppliedRole?: string;
  Stage?: string;
  Source?: string;
  AppliedAtUtc?: string;
  NextInterviewAtUtc?: string;
  ResumeUrl?: string;
  Notes?: string;
}

export type Certificationstatus = 0 | 1 | 2;

export interface Changepasswordrequest {
  CurrentPassword?: string;
  NewPassword?: string;
}

export interface Clockinrequest {
  TimestampUtc?: string;
  ShiftName?: string;
  Notes?: string;
}

export interface Clockoutrequest {
  TimestampUtc?: string;
  Notes?: string;
}

export interface Commsannouncementdto {
  Id?: string;
  OrganizationId?: string;
  DepartmentId?: string;
  Title?: string;
  Body?: string;
  PublishedAtUtc?: string;
  PublishedById?: string;
  IsPinned?: boolean;
}

export interface Commsannouncementdtopaginatedresponse {
  PageNumber?: number;
  PageSize?: number;
  TotalCount?: number;
  TotalPages?: number;
  Items?: Commsannouncementdto[];
  IsLastPage?: boolean;
}

export interface Compensationreviewdto {
  EffectiveDate?: string;
  CurrentBaseSalary?: number;
  ProposedBaseSalary?: number;
  BonusRecommendation?: number;
  Currency?: string;
  Notes?: string;
}

export interface Compensationreviewrequest {
  EffectiveDate: string;
  CurrentBaseSalary?: number;
  ProposedBaseSalary?: number;
  BonusRecommendation?: number;
  Currency?: string;
  Notes?: string;
}

export interface Confirmemailrequest {
  UserId?: string;
  Token?: string;
}

export interface Coursecertificationdto {
  Id?: string;
  CourseId?: string;
  EmployeeId?: string;
  CertificateNumber?: string;
  IssuedOn?: string;
  ExpiresOn?: string;
  IssuedBy?: string;
  Status?: Certificationstatus;
  GovernanceNotes?: string;
}

export interface Courseenrollmentdto {
  Id?: string;
  CourseId?: string;
  EmployeeId?: string;
  EnrolledOn?: string;
  Status?: Courseenrollmentstatus;
  CompletionPercentage?: number;
  CompletedOn?: string;
  CertificationId?: string;
}

export type Courseenrollmentstatus = 0 | 1 | 2 | 3;

export interface Courseprogressanalyticsdto {
  CourseId?: string;
  TotalEnrollments?: number;
  ActiveEnrollments?: number;
  CompletedEnrollments?: number;
  AverageCompletionPercentage?: number;
  GeneratedOnUtc?: string;
}

export interface Createanalyticssnapshotrequest {
  CapturedAtUtc: string;
  Headcount?: number;
  TurnoverRate?: number;
  AverageTenureMonths?: number;
  HiringVelocity?: number;
  EngagementScore?: number;
  Commentary?: string;
}

export interface Createannouncementrequest {
  Title: string;
  Message: string;
  Audience?: string;
  CreatedBy: string;
  RequiresAcknowledgement?: boolean;
}

export interface Createattendancerecordrequest {
  EmployeeId: string;
  WorkDate: string;
  ShiftName?: string;
  ClockInUtc?: string;
  ClockOutUtc?: string;
  OvertimeMinutes?: number;
  Status?: string;
  Notes?: string;
}

export interface Createcandidaterequest {
  FullName: string;
  Email: string;
  AppliedRole: string;
  Stage?: string;
  Source?: string;
  ResumeUrl?: string;
  Notes?: string;
  NextInterviewAtUtc?: string;
}

export interface Createcommsannouncementrequest {
  OrganizationId: string;
  DepartmentId?: string;
  Title: string;
  Body: string;
  PublishedById: string;
}

export interface Createcourseenrollmentrequest {
  CourseId: string;
  EmployeeId: string;
  EnrolledOn?: string;
}

export interface Createdelegatedauthorityrequest {
  GrantorEmployeeId?: string;
  DelegateEmployeeId?: string;
  GrantorPositionId?: string;
  DelegatePositionId?: string;
  AuthorityScope: string;
  ApprovalLimit?: number;
  GrantedOnUtc?: string;
  ExpiresOnUtc?: string;
  Notes?: string;
}

export interface Createdepartmentrequest {
  Name: string;
  Code: string;
  OrganizationId: string;
  ParentDepartmentId?: string;
  ManagerId?: string;
  Branch?: string;
  Location?: string;
  Description?: string;
  IsActive?: boolean;
}

export interface Createemployeerequest {
  FirstName: string;
  LastName: string;
  Email: string;
  EmploymentStartDate: string;
  JobTitle?: string;
  EmploymentEndDate?: string;
  DateOfBirth?: string;
  DepartmentAssignment: Employeedepartmentassignmentrequest;
  JobArchitecture?: Employeejobarchitecturerequest;
  Contracts?: Employmentcontractrequest[];
  ComplianceDocuments?: Employeecompliancedocumentrequest[];
}

export interface Createengagementcampaignrequest {
  Name?: string;
  Description?: string;
  Channels?: string;
  TargetAudience?: string;
  LaunchDateUtc?: string;
  EndDateUtc?: string;
  OwnerId?: string;
  IsAutomated?: boolean;
}

export interface Createleaverequest {
  EmployeeId: string;
  LeaveType: string;
  StartDate: string;
  EndDate: string;
  Reason?: string;
}

export interface Createlitecourserequest {
  OrganizationId: string;
  Code: string;
  Title: string;
  Description?: string;
  DurationHours?: number;
  IsMandatory?: boolean;
}

export interface Createlitecoursesessionrequest {
  CourseId: string;
  StartUtc: string;
  EndUtc: string;
  Location?: string;
  MeetingUrl?: string;
  Capacity?: number;
}

export interface Createorganizationrequest {
  Name: string;
  Code: string;
  Description?: string;
  IsActive?: boolean;
}

export interface Createorganizationunitrequest {
  Name: string;
  Code: string;
  Type: string;
  ParentUnitId?: string;
  DepartmentId?: string;
  LeadPositionId?: string;
  Level?: number;
  Description?: string;
  IsActive?: boolean;
}

export interface Createpayrollrunrequest {
  OrganizationId: string;
  PeriodStart: string;
  PeriodEnd: string;
  Notes?: string;
}

export interface Createperformancereviewrequest {
  EmployeeId: string;
  CycleName: string;
  PeriodStart: string;
  PeriodEnd: string;
  OverallScore?: number;
  ManagerComments?: string;
  GoalsSummary?: string;
  Goals?: Performancegoalrequest[];
  KeyPerformanceIndicators?: Performancekpirequest[];
  FeedbackCycles?: Performancefeedbackrequest[];
  CompensationReview?: Compensationreviewrequest;
}

export interface Createpositionrequest {
  Title: string;
  JobCode: string;
  OrganizationUnitId: string;
  ReportsToPositionId?: string;
  OccupiedByEmployeeId?: string;
  Grade?: string;
  EmploymentType?: string;
  EffectiveFrom?: string;
  EffectiveTo?: string;
  IsCriticalRole?: boolean;
  IsVacant?: boolean;
}

export interface Createpulsesurveyrequest {
  Title?: string;
  Description?: string;
  Audience?: string;
  QuestionSet?: string;
  ResponseWindowMinutes?: number;
  LaunchDateUtc?: string;
  CloseDateUtc?: string;
  OwnerId?: string;
}

export interface Createrecognitionprogramrequest {
  Name?: string;
  Description?: string;
  Criteria?: string;
  Reward?: string;
  IsPeerToPeer?: boolean;
  IsActive?: boolean;
  OwnerId?: string;
}

export interface Createreportingrelationshiprequest {
  ManagerPositionId: string;
  ReportPositionId: string;
  RelationshipType: string;
  EffectiveFrom?: string;
  EffectiveTo?: string;
  IsPrimary?: boolean;
}

export interface Createselfserviceaccountrequest {
  EmployeeId: string;
  Email: string;
  OAuthProvider: string;
  ExternalIdentifier: string;
  IsMfaEnabled?: boolean;
  IsLocked?: boolean;
  LastSignInUtc?: string;
  FeatureAccess?: string[];
}

export interface Createtrainingcourserequest {
  Title: string;
  Category?: string;
  Description?: string;
  Instructor?: string;
  StartDate: string;
  EndDate: string;
  Capacity?: number;
  DeliveryMode?: string;
  SkillLevel?: string;
  DurationHours?: number;
  CertificationCriteria?: string;
  CompetencyCodes?: string[];
  OffersCertification?: boolean;
}

export interface Createvacancyrequest {
  Title: string;
  Department: string;
  Location: string;
  EmploymentType: string;
  Description: string;
  Responsibilities?: string[];
  Requirements?: string[];
  PipelineStages?: string[];
  HiringTeam?: string[];
  ApplicationUrl?: string;
  ClosingAtUtc?: string;
}

export interface Delegatedauthoritydto {
  Id?: string;
  GrantorEmployeeId?: string;
  DelegateEmployeeId?: string;
  GrantorPositionId?: string;
  DelegatePositionId?: string;
  AuthorityScope?: string;
  ApprovalLimit?: number;
  GrantedOnUtc?: string;
  ExpiresOnUtc?: string;
  RevokedOnUtc?: string;
  IsRevoked?: boolean;
  Notes?: string;
}

export interface Departmentdto {
  Id?: string;
  Name?: string;
  Code?: string;
  OrganizationId?: string;
  ParentDepartmentId?: string;
  ManagerId?: string;
  Branch?: string;
  Location?: string;
  Description?: string;
  IsActive?: boolean;
  Path?: string;
  Level?: number;
  Children?: Departmentdto[];
}

export interface Departmentpayrolltotalsdto {
  DepartmentId?: string;
  DepartmentName?: string;
  TotalGross?: number;
  TotalNet?: number;
}

export interface Employeecompliancedocumentdto {
  Id?: string;
  DocumentType?: string;
  ReferenceNumber?: string;
  Status?: string;
  IssuedOn?: string;
  ExpiresOn?: string;
  StoragePath?: string;
}

export interface Employeecompliancedocumentrequest {
  Id?: string;
  DocumentType: string;
  ReferenceNumber: string;
  Status?: string;
  IssuedOn: string;
  ExpiresOn?: string;
  StoragePath?: string;
}

export interface Employeedepartmentassignmentrequest {
  PrimaryDepartmentId: string;
  SecondaryDepartmentIds?: string[];
}

export interface Employeedepartmentidentifiersrequest {
  DepartmentIds: string[];
}

export interface Employeedto {
  Id?: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  JobTitle?: string;
  PrimaryDepartmentId?: string;
  DepartmentIds?: string[];
  EmploymentStartDate?: string;
  EmploymentEndDate?: string;
  DateOfBirth?: string;
  JobArchitecture?: Employeejobarchitecturedto;
  Contracts?: Employmentcontractdto[];
  ComplianceDocuments?: Employeecompliancedocumentdto[];
}

export interface Employeedtopaginatedresponse {
  PageNumber?: number;
  PageSize?: number;
  TotalCount?: number;
  TotalPages?: number;
  Items?: Employeedto[];
  IsLastPage?: boolean;
}

export interface Employeejobarchitecturedto {
  JobFamily?: string;
  JobFunction?: string;
  JobLevel?: string;
  JobCode?: string;
  CareerTrack?: string;
}

export interface Employeejobarchitecturerequest {
  JobFamily?: string;
  JobFunction?: string;
  JobLevel?: string;
  JobCode?: string;
  CareerTrack?: string;
}

export interface Employeeorganizationsnapshotdto {
  EmployeeId?: string;
  Position?: Positiondto;
  OrganizationUnit?: Organizationunitdto;
  ReportingLines?: Reportingrelationshipdto[];
  DelegatedAuthorities?: Delegatedauthoritydto[];
  SelfServiceAccount?: Selfserviceaccountdto;
}

export interface Employmentcontractdto {
  Id?: string;
  ContractType?: string;
  ContractNumber?: string;
  Status?: string;
  EffectiveFrom?: string;
  EffectiveTo?: string;
  FtePercentage?: number;
  WorkLocation?: string;
  CompensationCurrency?: string;
  AnnualCompensation?: number;
  Notes?: string;
}

export interface Employmentcontractrequest {
  Id?: string;
  ContractType: string;
  ContractNumber?: string;
  Status?: string;
  EffectiveFrom: string;
  EffectiveTo?: string;
  FtePercentage?: number;
  WorkLocation?: string;
  CompensationCurrency?: string;
  AnnualCompensation?: number;
  Notes?: string;
}

export interface Engagementcampaigndto {
  Id?: string;
  Name?: string;
  Description?: string;
  Channels?: string;
  TargetAudience?: string;
  LaunchDateUtc?: string;
  EndDateUtc?: string;
  OwnerId?: string;
  IsAutomated?: boolean;
}

export interface Errordetail {
  Field?: string;
  Message?: string;
  Code?: string;
}

export interface Errorresponse {
  Code?: string;
  Message?: string;
  TraceId?: string;
  Details?: Errordetail[];
}

export interface Featuretogglestatusdto {
  FeatureKey?: string;
  DisplayName?: string;
  Usage?: string;
  Enabled?: boolean;
}

export interface Forgotpasswordrequest {
  Email?: string;
}

export interface Headcountitemdto {
  DepartmentId?: string;
  DepartmentName?: string;
  Count?: number;
}

export interface Hiringteamcontributordto {
  Name?: string;
  VacancyCount?: number;
}

export interface Interviewscheduledto {
  Id?: string;
  CandidateId?: string;
  VacancyId?: string;
  Stage?: string;
  ScheduledAtUtc?: string;
  DurationMinutes?: number;
  Mode?: string;
  Location?: string;
  MeetingLink?: string;
  Interviewers?: string[];
  Status?: string;
  Notes?: string;
}

export interface Issuecoursecertificationrequest {
  CourseId: string;
  EmployeeId: string;
  CertificateNumber: string;
  IssuedOn: string;
  ExpiresOn?: string;
  IssuedBy: string;
  GovernanceNotes?: string;
}

export interface Leavebalancedto {
  EmployeeId?: string;
  LeaveTypeId?: string;
  Year?: number;
  Opening?: number;
  Accrued?: number;
  Taken?: number;
  CarriedOver?: number;
  Reserved?: number;
  Available?: number;
}

export interface Leaverequestdto {
  Id?: string;
  EmployeeId?: string;
  LeaveType?: string;
  StartDate?: string;
  EndDate?: string;
  Status?: string;
  ApproverId?: string;
  Reason?: string;
  RequestedAtUtc?: string;
  DecisionAtUtc?: string;
}

export interface Leavetypedto {
  Id?: string;
  Code?: string;
  Name?: string;
  RequiresApproval?: boolean;
  AnnualAllowanceDays?: number;
  CarryOverDays?: number;
}

export interface Leaveusageitemdto {
  LeaveType?: string;
  Days?: number;
}

export interface Litecoursedto {
  Id?: string;
  OrganizationId?: string;
  Code?: string;
  Title?: string;
  Description?: string;
  DurationHours?: number;
  IsMandatory?: boolean;
}

export interface Litecoursesessiondto {
  Id?: string;
  CourseId?: string;
  StartUtc?: string;
  EndUtc?: string;
  Location?: string;
  MeetingUrl?: string;
  Capacity?: number;
}

export interface Liteenrollmentdto {
  SessionId?: string;
  EmployeeId?: string;
  EnrolledAtUtc?: string;
  Status?: Liteenrollmentstatus;
  Score?: number;
  CertificateUrl?: string;
}

export type Liteenrollmentstatus = 0 | 1 | 2;

export interface Lockoutrequest {
  Enabled?: boolean;
  LockoutEnd?: string;
}

export interface Loginrequest {
  Email?: string;
  Password?: string;
}

export interface Meresponse {
  UserId?: string;
  UserName?: string;
  Email?: string;
  EmployeeId?: string;
  Roles?: string[];
}

export interface Movedepartmentrequest {
  NewParentDepartmentId?: string;
}

export interface Newleaverequestinput {
  EmployeeId?: string;
  LeaveTypeId?: string;
  StartDate?: string;
  EndDate?: string;
  Reason?: string;
  Draft?: boolean;
}

export interface Organizationdto {
  Id?: string;
  Name?: string;
  Code?: string;
  Description?: string;
  IsActive?: boolean;
}

export interface Organizationhierarchynodedto {
  Unit?: Organizationunitdto;
  Children?: Organizationhierarchynodedto[];
}

export interface Organizationunitdto {
  Id?: string;
  Name?: string;
  Code?: string;
  Type?: string;
  ParentUnitId?: string;
  DepartmentId?: string;
  LeadPositionId?: string;
  Level?: number;
  Description?: string;
  IsActive?: boolean;
}

export interface Pagedleaverequestsdto {
  Page?: number;
  PageSize?: number;
  TotalCount?: number;
  Items?: Leaverequestdto[];
}

export interface Payrollitemdto {
  Id?: string;
  RunId?: string;
  EmployeeId?: string;
  Gross?: number;
  Deductions?: number;
  Net?: number;
  Currency?: string;
  Breakdown?: string;
}

export interface Payrollrundto {
  Id?: string;
  OrganizationId?: string;
  PeriodStart?: string;
  PeriodEnd?: string;
  Status?: string;
  CreatedAtUtc?: string;
  ApprovedAtUtc?: string;
  PaidAtUtc?: string;
  TotalGrossPay?: number;
  TotalNetPay?: number;
  Notes?: string;
}

export interface Payrollruntotalsdto {
  RunId?: string;
  PeriodStart?: string;
  PeriodEnd?: string;
  TotalGross?: number;
  TotalNet?: number;
}

export interface Payrolltotalsresponsedto {
  Runs?: Payrollruntotalsdto[];
  ByDepartment?: Departmentpayrolltotalsdto[];
}

export interface Payslipdto {
  Id?: string;
  RunId?: string;
  EmployeeId?: string;
  PublicUrl?: string;
  GeneratedAtUtc?: string;
}

export interface Performancefeedbackdto {
  Id?: string;
  FeedbackType?: string;
  Comments?: string;
  SubmittedBy?: string;
  SubmittedAtUtc?: string;
}

export interface Performancefeedbackrequest {
  Id?: string;
  FeedbackType: string;
  Comments: string;
  SubmittedBy: string;
  SubmittedAtUtc?: string;
}

export interface Performancegoaldto {
  Id?: string;
  Title?: string;
  Description?: string;
  Weight?: number;
  ParentGoalId?: string;
  Alignment?: string;
  Status?: string;
}

export interface Performancegoalrequest {
  Id?: string;
  Title: string;
  Description?: string;
  Weight?: number;
  ParentGoalId?: string;
  Alignment?: string;
  Status?: string;
}

export interface Performancekpidto {
  Id?: string;
  Name?: string;
  TargetValue?: number;
  ActualValue?: number;
  UnitOfMeasure?: string;
  Status?: string;
}

export interface Performancekpirequest {
  Id?: string;
  Name: string;
  TargetValue: number;
  ActualValue?: number;
  UnitOfMeasure?: string;
  Status?: string;
}

export interface Performancereviewdto {
  Id?: string;
  EmployeeId?: string;
  CycleName?: string;
  PeriodStart?: string;
  PeriodEnd?: string;
  OverallScore?: number;
  ManagerComments?: string;
  GoalsSummary?: string;
  Goals?: Performancegoaldto[];
  KeyPerformanceIndicators?: Performancekpidto[];
  FeedbackCycles?: Performancefeedbackdto[];
  CompensationReview?: Compensationreviewdto;
  SubmittedAtUtc?: string;
}

export interface Pipelinestagesummarydto {
  Stage?: string;
  CandidateCount?: number;
}

export interface Platformconfigurationdto {
  RepositoryProvider?: string;
  DatabaseProvider?: string;
  Features?: Featuretogglestatusdto[];
}

export interface Positiondto {
  Id?: string;
  Title?: string;
  JobCode?: string;
  OrganizationUnitId?: string;
  ReportsToPositionId?: string;
  OccupiedByEmployeeId?: string;
  Grade?: string;
  EmploymentType?: string;
  EffectiveFrom?: string;
  EffectiveTo?: string;
  IsCriticalRole?: boolean;
  IsVacant?: boolean;
}

export interface Problemdetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  [key: string]: unknown;
}

export interface Pulsesurveydto {
  Id?: string;
  Title?: string;
  Description?: string;
  Audience?: string;
  QuestionSet?: string;
  ResponseWindowMinutes?: number;
  LaunchDateUtc?: string;
  CloseDateUtc?: string;
  OwnerId?: string;
}

export interface Recognitionprogramdto {
  Id?: string;
  Name?: string;
  Description?: string;
  Criteria?: string;
  Reward?: string;
  IsPeerToPeer?: boolean;
  IsActive?: boolean;
  OwnerId?: string;
  CreatedAtUtc?: string;
}

export interface Recruitmentinsightsdto {
  TotalVacancies?: number;
  OpenVacancies?: number;
  ActiveCandidates?: number;
  PipelineStageSummaries?: Pipelinestagesummarydto[];
  UpcomingInterviews?: Upcominginterviewsummarydto[];
  HiringTeamCollaborators?: Hiringteamcontributordto[];
}

export interface Refreshrequest {
  RefreshToken?: string;
}

export interface Registeremployeerequest {
  Email?: string;
  UserName?: string;
  Password?: string;
  EmployeeId?: string;
}

export interface Registeruserrequestclaims {
  [key: string]: string;
}

export interface Registeruserrequest {
  Email?: string;
  Password?: string;
  CustomerId?: string;
  Roles?: string[];
  Claims?: Registeruserrequestclaims;
}

export interface Registrationresponse {
  UserId?: string;
  EmailConfirmationToken?: string;
}

export interface Rejecttimesheetrequest {
  ManagerId?: string;
  Reason?: string;
}

export interface Reportingrelationshipdto {
  Id?: string;
  ManagerPositionId?: string;
  ReportPositionId?: string;
  RelationshipType?: string;
  EffectiveFrom?: string;
  EffectiveTo?: string;
  IsPrimary?: boolean;
}

export interface Resendconfirmationrequest {
  UserId?: string;
}

export interface Resetpasswordrequest {
  UserId?: string;
  Token?: string;
  NewPassword?: string;
}

export interface Revokecoursecertificationrequest {
  GovernanceNotes?: string;
}

export interface Salaryslipdto {
  PayrollRunId?: string;
  EmployeeId?: string;
  PeriodStart?: string;
  PeriodEnd?: string;
  ProcessedAtUtc?: string;
  Status?: string;
  GrossPay?: number;
  NetPay?: number;
  Notes?: string;
}

export interface Scheduleinterviewrequest {
  CandidateId: string;
  VacancyId: string;
  Stage: string;
  ScheduledAtUtc: string;
  DurationMinutes?: number;
  Mode?: string;
  Location?: string;
  MeetingLink?: string;
  Interviewers?: string[];
  Notes?: string;
}

export interface Selfserviceaccountdto {
  Id?: string;
  EmployeeId?: string;
  Email?: string;
  OAuthProvider?: string;
  ExternalIdentifier?: string;
  IsMfaEnabled?: boolean;
  IsLocked?: boolean;
  CreatedOnUtc?: string;
  UpdatedOnUtc?: string;
  LastSignInUtc?: string;
  FeatureAccess?: string[];
}

export interface Stagecountdto {
  Stage?: string;
  Count?: number;
}

export interface Systemhealthresponse {
  Status?: string;
  Environment?: string;
  Timestamp?: string;
}

export interface Systemversionresponse {
  Version?: string;
  Environment?: string;
}

export interface Timesheetdto {
  Id?: string;
  EmployeeId?: string;
  WeekStartUtc?: string;
  Status?: Timesheetstatus;
  SubmittedAtUtc?: string;
  ApprovedAtUtc?: string;
  ManagerId?: string;
  Notes?: string;
  Entries?: Timesheetentrydto[];
}

export interface Timesheetdtopaginatedresponse {
  PageNumber?: number;
  PageSize?: number;
  TotalCount?: number;
  TotalPages?: number;
  Items?: Timesheetdto[];
  IsLastPage?: boolean;
}

export interface Timesheetentrydto {
  Id?: string;
  TimesheetId?: string;
  DateUtc?: string;
  DepartmentId?: string;
  ProjectCode?: string;
  TaskCode?: string;
  Hours?: number;
  Description?: string;
}

export type Timesheetstatus = 0 | 1 | 2 | 3;

export interface Tokenresponse {
  UserId?: string;
  Token?: string;
  TokenType?: string;
}

export interface Trainingcompliancedto {
  OrganizationId?: string;
  MandatoryCourseCount?: number;
  ObservedEmployeeCount?: number;
  CompliantEmployeeCount?: number;
  ComplianceRate?: number;
}

export interface Trainingcoursedto {
  Id?: string;
  Title?: string;
  Category?: string;
  Description?: string;
  Instructor?: string;
  StartDate?: string;
  EndDate?: string;
  Capacity?: number;
  DeliveryMode?: string;
  CompetencyCodes?: string[];
  SkillLevel?: string;
  OffersCertification?: boolean;
  CertificationCriteria?: string;
  DurationHours?: number;
}

export interface Upcominginterviewsummarydto {
  InterviewId?: string;
  CandidateId?: string;
  VacancyId?: string;
  ScheduledAtUtc?: string;
  Stage?: string;
  Interviewers?: string[];
}

export interface Updateanalyticssnapshotrequest {
  CapturedAtUtc: string;
  Headcount?: number;
  TurnoverRate?: number;
  AverageTenureMonths?: number;
  HiringVelocity?: number;
  EngagementScore?: number;
  Commentary?: string;
}

export interface Updateannouncementrequest {
  Title: string;
  Message: string;
  Audience?: string;
  CreatedBy: string;
  RequiresAcknowledgement?: boolean;
  PublishedAtUtc?: string;
}

export interface Updateattendancerecordrequest {
  EmployeeId: string;
  WorkDate: string;
  ShiftName?: string;
  ClockInUtc?: string;
  ClockOutUtc?: string;
  OvertimeMinutes?: number;
  Status?: string;
  Notes?: string;
}

export interface Updatecandidaterequest {
  FullName: string;
  Email: string;
  AppliedRole: string;
  Stage?: string;
  Source?: string;
  ResumeUrl?: string;
  Notes?: string;
  NextInterviewAtUtc?: string;
}

export interface Updatecourseenrollmentprogressrequest {
  CompletionPercentage?: number;
  Status?: Courseenrollmentstatus;
  CompletedOn?: string;
}

export interface Updatedelegatedauthorityrequest {
  GrantorEmployeeId?: string;
  DelegateEmployeeId?: string;
  GrantorPositionId?: string;
  DelegatePositionId?: string;
  AuthorityScope: string;
  ApprovalLimit?: number;
  GrantedOnUtc?: string;
  ExpiresOnUtc?: string;
  RevokedOnUtc?: string;
  IsRevoked?: boolean;
  Notes?: string;
}

export interface Updatedepartmentrequest {
  Name: string;
  Code: string;
  OrganizationId: string;
  ParentDepartmentId?: string;
  ManagerId?: string;
  Branch?: string;
  Location?: string;
  Description?: string;
  IsActive?: boolean;
}

export interface Updateemployeerequest {
  FirstName: string;
  LastName: string;
  Email: string;
  EmploymentStartDate: string;
  JobTitle?: string;
  EmploymentEndDate?: string;
  DateOfBirth?: string;
  DepartmentAssignment: Employeedepartmentassignmentrequest;
  JobArchitecture?: Employeejobarchitecturerequest;
  Contracts?: Employmentcontractrequest[];
  ComplianceDocuments?: Employeecompliancedocumentrequest[];
}

export interface Updateengagementcampaignrequest {
  Name?: string;
  Description?: string;
  Channels?: string;
  TargetAudience?: string;
  LaunchDateUtc?: string;
  EndDateUtc?: string;
  OwnerId?: string;
  IsAutomated?: boolean;
}

export interface Updateinterviewschedulerequest {
  Stage: string;
  ScheduledAtUtc: string;
  DurationMinutes?: number;
  Mode?: string;
  Location?: string;
  MeetingLink?: string;
  Interviewers?: string[];
  Notes?: string;
  Status?: string;
}

export interface Updateleaverequest {
  LeaveType: string;
  StartDate: string;
  EndDate: string;
  Reason?: string;
  Status?: string;
  ApproverId?: string;
  DecisionAtUtc?: string;
}

export interface Updateorganizationrequest {
  Name: string;
  Code: string;
  Description?: string;
  IsActive?: boolean;
}

export interface Updateorganizationunitrequest {
  Name: string;
  Code: string;
  Type: string;
  ParentUnitId?: string;
  DepartmentId?: string;
  LeadPositionId?: string;
  Level?: number;
  Description?: string;
  IsActive?: boolean;
}

export interface Updateperformancereviewrequest {
  CycleName: string;
  PeriodStart: string;
  PeriodEnd: string;
  OverallScore?: number;
  ManagerComments?: string;
  GoalsSummary?: string;
  Goals?: Performancegoalrequest[];
  KeyPerformanceIndicators?: Performancekpirequest[];
  FeedbackCycles?: Performancefeedbackrequest[];
  CompensationReview?: Compensationreviewrequest;
  SubmittedAtUtc?: string;
}

export interface Updatepositionrequest {
  Title: string;
  JobCode: string;
  OrganizationUnitId: string;
  ReportsToPositionId?: string;
  OccupiedByEmployeeId?: string;
  Grade?: string;
  EmploymentType?: string;
  EffectiveFrom?: string;
  EffectiveTo?: string;
  IsCriticalRole?: boolean;
  IsVacant?: boolean;
}

export interface Updatepulsesurveyrequest {
  Title?: string;
  Description?: string;
  Audience?: string;
  QuestionSet?: string;
  ResponseWindowMinutes?: number;
  LaunchDateUtc?: string;
  CloseDateUtc?: string;
  OwnerId?: string;
}

export interface Updaterecognitionprogramrequest {
  Name?: string;
  Description?: string;
  Criteria?: string;
  Reward?: string;
  IsPeerToPeer?: boolean;
  IsActive?: boolean;
  OwnerId?: string;
  CreatedAtUtc?: string;
}

export interface Updatereportingrelationshiprequest {
  ManagerPositionId: string;
  ReportPositionId: string;
  RelationshipType: string;
  EffectiveFrom?: string;
  EffectiveTo?: string;
  IsPrimary?: boolean;
}

export interface Updateselfserviceaccountrequest {
  Email: string;
  OAuthProvider: string;
  ExternalIdentifier: string;
  IsMfaEnabled?: boolean;
  IsLocked?: boolean;
  LastSignInUtc?: string;
  FeatureAccess?: string[];
}

export interface Updatetrainingcourserequest {
  Title: string;
  Category?: string;
  Description?: string;
  Instructor?: string;
  StartDate: string;
  EndDate: string;
  Capacity?: number;
  DeliveryMode?: string;
  SkillLevel?: string;
  DurationHours?: number;
  CertificationCriteria?: string;
  CompetencyCodes?: string[];
  OffersCertification?: boolean;
}

export interface Updateuserclaimsrequestclaims {
  [key: string]: string;
}

export interface Updateuserclaimsrequest {
  Claims?: Updateuserclaimsrequestclaims;
}

export interface Updateuserrolesrequest {
  Roles?: string[];
}

export interface Updatevacancyrequest {
  Title: string;
  Department: string;
  Location: string;
  EmploymentType: string;
  Description: string;
  Responsibilities?: string[];
  Requirements?: string[];
  PipelineStages?: string[];
  HiringTeam?: string[];
  ApplicationUrl?: string;
  ClosingAtUtc?: string;
  Status?: string;
}

export interface Upserttimesheetentryrequest {
  Id?: string;
  DateUtc?: string;
  DepartmentId?: string;
  ProjectCode?: string;
  TaskCode?: string;
  Hours?: number;
  Description?: string;
}

export interface Userclaimsresponseclaims {
  [key: string]: string;
}

export interface Userclaimsresponse {
  UserId?: string;
  Claims?: Userclaimsresponseclaims;
}

export interface Userrolesresponse {
  UserId?: string;
  Roles?: string[];
}

export interface Utilizationperioddto {
  PeriodStart?: string;
  PeriodEnd?: string;
  ApprovedHours?: number;
  CapacityHours?: number;
  UtilizationRate?: number;
}

export interface Vacancydto {
  Id?: string;
  Title?: string;
  Department?: string;
  Location?: string;
  EmploymentType?: string;
  Description?: string;
  Responsibilities?: string[];
  Requirements?: string[];
  PipelineStages?: string[];
  HiringTeam?: string[];
  PostedAtUtc?: string;
  ClosingAtUtc?: string;
  Status?: string;
  ApplicationUrl?: string;
}