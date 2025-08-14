import { gql } from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Number or Array Number */
  IntOrAInt: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AccessPermission = {
  isRoot: Scalars['Boolean']['output'];
  serviceCode: Scalars['String']['output'];
  statement?: Maybe<AccessStatement>;
  userInfo: UserInfo;
  version: Scalars['String']['output'];
};

export enum AccessSessionClient {
  App = 'App',
  Desktop = 'Desktop',
  Web = 'Web'
}

export type AccessStatement = {
  Allow?: Maybe<Array<StatementPolicy>>;
  Deny?: Maybe<Array<StatementPolicy>>;
  Menus?: Maybe<Array<StatementMenu>>;
};

export enum ActionUnit {
  Department = 'Department',
  Leader = 'Leader',
  Level = 'Level',
  Person = 'Person'
}

export enum ActiveStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export type AddEmployeeArgs = {
  accountHolder?: InputMaybe<Scalars['String']['input']>;
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  addressZoneId?: InputMaybe<Scalars['String']['input']>;
  attachFileIds?: InputMaybe<Array<Scalars['String']['input']>>;
  bankBranch?: InputMaybe<Scalars['String']['input']>;
  bankId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Float']['input']>;
  departments?: InputMaybe<Array<EmployeeDepartmentArgs>>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname: Scalars['String']['input'];
  hrCode?: InputMaybe<Scalars['String']['input']>;
  idCardIssuedOn?: InputMaybe<Scalars['Float']['input']>;
  idCardIssuedPlace?: InputMaybe<Scalars['String']['input']>;
  identityCard?: InputMaybe<Scalars['String']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  leaderId?: InputMaybe<Scalars['String']['input']>;
  leaveOn?: InputMaybe<Scalars['Float']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  officalWorkingOn?: InputMaybe<Scalars['Float']['input']>;
  onboardingOn?: InputMaybe<Scalars['Float']['input']>;
  personalEmail?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  relativePhone?: InputMaybe<Scalars['String']['input']>;
  socialInsuranceCode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  tempAddress?: InputMaybe<Scalars['String']['input']>;
  tempAddressZoneId?: InputMaybe<Scalars['String']['input']>;
};

export type AddSysUserArgs = {
  businessRoleId: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  orgChartIds: Array<Scalars['String']['input']>;
};

export type Address = {
  address?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  countryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  districtId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  provinceId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  ward?: Maybe<Scalars['String']['output']>;
  wardId?: Maybe<Scalars['String']['output']>;
};

export type AddressLearningFilterInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressResponse = {
  address?: Maybe<Scalars['String']['output']>;
  addressZone?: Maybe<AddressZone>;
  district?: Maybe<Scalars['String']['output']>;
  fullAddress?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  ward?: Maybe<Scalars['String']['output']>;
};

export type AddressTextArgs = {
  text: Scalars['String']['input'];
};

export enum AddressType {
  Permanent = 'Permanent',
  Temporary = 'Temporary'
}

export type AddressZone = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  english?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<AddressZone>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type AddressZoneFilterArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Float']['input']>;
};

export type AddressZoneResponse = {
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  zones?: Maybe<Array<AddressZone>>;
};

export type AnalysisNumberOfUserUsedAppFilter = {
  latestLoginTime?: InputMaybe<Scalars['Float']['input']>;
  orgChardId?: InputMaybe<Scalars['String']['input']>;
};

export type AnalysisNumberOfUserUsedAppResponse = {
  records?: Maybe<Array<OfficeUser>>;
  total: Scalars['Int']['output'];
};

export type AppNotificationFilterArgs = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AppNotificationResponse = {
  count: Scalars['Int']['output'];
  notifications?: Maybe<Array<Notification>>;
  total: Scalars['Int']['output'];
};

export type AppNotificationUpdateAllArgs = {
  isRead?: Scalars['Boolean']['input'];
};

export type AppNotificationUpdateArgs = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  noticationId: Scalars['String']['input'];
};

export enum ApprovalAction {
  Approve = 'Approve',
  Consent = 'Consent'
}

export type ApprovalActionArgs = {
  action: ApprovalProcessAction;
  approvalRowIds?: InputMaybe<Array<Scalars['String']['input']>>;
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  comment?: InputMaybe<Scalars['String']['input']>;
  grantStepId?: InputMaybe<Scalars['String']['input']>;
  grantTo?: InputMaybe<Scalars['String']['input']>;
  grantToType?: InputMaybe<GrantType>;
  id: Scalars['String']['input'];
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApprovalApproveStepUpdateInput = {
  approvalId: Scalars['String']['input'];
  newSteps?: InputMaybe<Array<ApprovalStepArgs>>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type ApprovalArgs = {
  approvalsReferenceIds?: InputMaybe<Array<Scalars['String']['input']>>;
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  budget?: InputMaybe<Array<BudgetInput>>;
  draftId?: InputMaybe<Scalars['String']['input']>;
  formFieldData?: InputMaybe<Scalars['JSON']['input']>;
  formId?: InputMaybe<Scalars['String']['input']>;
  forwardData?: InputMaybe<ApprovalForwardDataInput>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  relatedDepartmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  source: ApprovalSource;
  structure?: InputMaybe<ApprovalStructureArgs>;
  submitType?: InputMaybe<ApprovalSubmitTypeEnum>;
  subscriberIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApprovalCommentCreate = {
  approvalId: Scalars['String']['input'];
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  comment?: InputMaybe<Scalars['String']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApprovalField = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  dataType: DataType;
  dateValue?: Maybe<Scalars['Float']['output']>;
  hintText?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  listValues?: Maybe<Array<Scalars['String']['output']>>;
  multiSelect: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  optionItems?: Maybe<Array<Scalars['String']['output']>>;
  order: Scalars['Float']['output'];
  required: Scalars['Boolean']['output'];
  tableColumns?: Maybe<Array<Scalars['String']['output']>>;
  tableRows?: Maybe<Array<ApprovalTableRow>>;
  textValue?: Maybe<Scalars['String']['output']>;
  timeInPast: Scalars['Boolean']['output'];
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type ApprovalFieldArgs = {
  dataType?: InputMaybe<DataType>;
  dateValue?: InputMaybe<Scalars['Float']['input']>;
  hintText?: InputMaybe<Scalars['String']['input']>;
  listValues?: InputMaybe<Array<Scalars['String']['input']>>;
  multiSelect?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  optionItems?: InputMaybe<Array<Scalars['String']['input']>>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  textValue?: InputMaybe<Scalars['String']['input']>;
  timeInPast?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ApprovalFilter = {
  approvalIds?: InputMaybe<Array<Scalars['String']['input']>>;
  createdFrom?: InputMaybe<Scalars['Float']['input']>;
  createdTo?: InputMaybe<Scalars['Float']['input']>;
  creatorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  doneAt?: InputMaybe<DatePeriod>;
  formIds?: InputMaybe<Array<Scalars['String']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ApprovalOwnerStatus>;
  statuses?: InputMaybe<Array<ApprovalStatus>>;
  type?: InputMaybe<ApprovalType>;
  yourAction?: InputMaybe<Array<YourActionEnum>>;
};

export type ApprovalFilterCreateInput = {
  filter?: InputMaybe<ApprovalFilterSave>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ApprovalFilterListFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type ApprovalFilterListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<OfficeFilter>>;
  total: Scalars['Int']['output'];
};

export type ApprovalFilterSave = {
  approvalIds?: InputMaybe<Array<Scalars['String']['input']>>;
  createdFrom?: InputMaybe<Scalars['Float']['input']>;
  createdTo?: InputMaybe<Scalars['Float']['input']>;
  creatorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  doneAt?: InputMaybe<DatePeriod>;
  formIds?: InputMaybe<Array<Scalars['String']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<ApprovalStatus>>;
  type?: InputMaybe<ApprovalType>;
  yourAction?: InputMaybe<Array<YourActionEnum>>;
};

export type ApprovalFilterUpdateInput = {
  approvalFilterId?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApprovalFilterSave>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ApprovalForm = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  departments?: Maybe<Array<OfficeOrgChart>>;
  fields?: Maybe<Array<ApprovalFormField>>;
  groups?: Maybe<Array<ApprovalFormGroup>>;
  id: Scalars['String']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  scope: ObjectScope;
  status: ObjectStatus;
  steps?: Maybe<Array<ApprovalFormStep>>;
  subcribers?: Maybe<Array<OfficeUser>>;
  subscriberIds?: Maybe<Array<Scalars['String']['output']>>;
  type: ApprovalType;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<OfficeUser>>;
};

export type ApprovalFormArgs = {
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  fields?: InputMaybe<Array<ApprovalFormFieldArgs>>;
  formGroupIds?: InputMaybe<Array<Scalars['String']['input']>>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
  steps?: InputMaybe<Array<ApprovalFormStepArgs>>;
  subscriber?: Array<Scalars['String']['input']>;
  type?: InputMaybe<ApprovalType>;
  typeId?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApprovalFormField = {
  columns?: Maybe<Array<ApprovalFormTableColumn>>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  dataType: DataType;
  hintText?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  multiSelect: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  optionItems?: Maybe<Array<Scalars['String']['output']>>;
  order: Scalars['Float']['output'];
  required: Scalars['Boolean']['output'];
  timeInPast: Scalars['Boolean']['output'];
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type ApprovalFormFieldArgs = {
  columns?: InputMaybe<Array<ApprovalTableColumnArgs>>;
  dataType?: InputMaybe<DataType>;
  hintText?: InputMaybe<Scalars['String']['input']>;
  multiSelect?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  optionItems?: InputMaybe<Array<Scalars['String']['input']>>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  timeInPast?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ApprovalFormFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  orgChartIds?: InputMaybe<Array<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ObjectStatus>;
  type?: InputMaybe<ApprovalType>;
};

export type ApprovalFormGroup = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  forms?: Maybe<Array<ApprovalForm>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: ActiveStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type ApprovalFormGroupCreateInput = {
  name: Scalars['String']['input'];
};

export type ApprovalFormGroupCreateUpdateInput = {
  formGroupId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ApprovalFormGroupFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ApprovalFormGroupResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<ApprovalFormGroup>>;
  total: Scalars['Int']['output'];
};

export type ApprovalFormResponse = PagingData & {
  approvalForms?: Maybe<Array<ApprovalForm>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ApprovalFormStep = {
  action: ApprovalAction;
  approveBy?: Maybe<Array<Scalars['String']['output']>>;
  approverLevel?: Maybe<Scalars['Int']['output']>;
  approvers?: Maybe<Array<OfficeUser>>;
  consentBy?: Maybe<Array<Scalars['String']['output']>>;
  consentUsers?: Maybe<Array<OfficeUser>>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  department?: Maybe<OfficeOrgChart>;
  departmentId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  unit: ActionUnit;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type ApprovalFormStepApproverArgs = {
  approveBy?: Array<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['Float']['input']>;
  unit: ActionUnit;
};

export type ApprovalFormStepArgs = {
  action: ApprovalAction;
  approver?: InputMaybe<ApprovalFormStepApproverArgs>;
  consentBy?: Array<Scalars['String']['input']>;
};

export type ApprovalFormTableColumn = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  dataType: DataType;
  hintText?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  multiSelect: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  optionItems?: Maybe<Array<Scalars['String']['output']>>;
  order: Scalars['Float']['output'];
  required: Scalars['Boolean']['output'];
  timeInPast: Scalars['Boolean']['output'];
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type ApprovalForward = {
  approval?: Maybe<OfficeApproval>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<OfficeUser>;
  id: Scalars['String']['output'];
  note: Scalars['String']['output'];
  originApproval?: Maybe<OfficeApproval>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<ApprovalForwardUser>>;
};

export type ApprovalForwardDataInput = {
  forwardUserData?: InputMaybe<Array<ApprovalForwardUserDataInput>>;
  note?: InputMaybe<Scalars['String']['input']>;
  originApprovalId?: InputMaybe<Scalars['String']['input']>;
};

export enum ApprovalForwardItem {
  Comment = 'Comment',
  Detail = 'Detail',
  History = 'History',
  Progress = 'Progress'
}

export type ApprovalForwardUser = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  forward?: Maybe<ApprovalForward>;
  id: Scalars['String']['output'];
  note: Scalars['String']['output'];
  showItems: Array<ApprovalForwardItem>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<OfficeUser>;
};

export type ApprovalForwardUserDataInput = {
  note?: InputMaybe<Scalars['String']['input']>;
  showItems?: InputMaybe<Array<ApprovalForwardItem>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ApprovalMenuCategoryItemResponse = {
  id?: Maybe<Scalars['String']['output']>;
  list?: Maybe<Array<OfficeFilter>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ApprovalMenuCountResponse = {
  approved?: Maybe<Scalars['Int']['output']>;
  draft?: Maybe<Scalars['Int']['output']>;
  notify?: Maybe<Scalars['Int']['output']>;
  submitted?: Maybe<Scalars['Int']['output']>;
  waiting?: Maybe<Scalars['Int']['output']>;
};

export type ApprovalMenuResponse = {
  count?: Maybe<ApprovalMenuCountResponse>;
};

export enum ApprovalOwnerStatus {
  Approved = 'Approved',
  Draft = 'Draft',
  Forward = 'Forward',
  NextAction = 'NextAction',
  Notify = 'Notify',
  Submitted = 'Submitted',
  Waiting = 'Waiting'
}

export enum ApprovalProcessAction {
  Approve = 'Approve',
  Cancel = 'Cancel',
  Comment = 'Comment',
  Consent = 'Consent',
  Grant = 'Grant',
  Pending = 'Pending',
  Reject = 'Reject',
  Submit = 'Submit'
}

export type ApprovalResponse = PagingData & {
  approvals?: Maybe<Array<OfficeApproval>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ApprovalSource {
  Blank = 'Blank',
  Finance = 'Finance',
  Template = 'Template'
}

export enum ApprovalStatus {
  Approved = 'Approved',
  Draft = 'Draft',
  Forward = 'Forward',
  Pending = 'Pending',
  Recalled = 'Recalled',
  Rejected = 'Rejected',
  UnderReview = 'UnderReview'
}

export type ApprovalStep = {
  action?: Maybe<ApprovalProcessAction>;
  actionAt?: Maybe<Scalars['Float']['output']>;
  actionBy?: Maybe<Scalars['String']['output']>;
  actionUser?: Maybe<OfficeUser>;
  approvalAction?: Maybe<ApprovalAction>;
  approvalRowIds?: Maybe<Array<Scalars['String']['output']>>;
  approveBy?: Maybe<Array<Scalars['String']['output']>>;
  approvedRows?: Maybe<Array<ApprovalTableRow>>;
  approverLevel?: Maybe<Scalars['Int']['output']>;
  approvers?: Maybe<Array<OfficeUser>>;
  attachmentUrls?: Maybe<Array<Scalars['String']['output']>>;
  canAction?: Maybe<Scalars['Boolean']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  consentBy?: Maybe<Array<Scalars['String']['output']>>;
  consentUsers?: Maybe<Array<OfficeUser>>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  currentStep: Scalars['Boolean']['output'];
  departmentId?: Maybe<Scalars['String']['output']>;
  grantFrom?: Maybe<Scalars['String']['output']>;
  grantTo?: Maybe<Scalars['String']['output']>;
  grantToType?: Maybe<GrantType>;
  id: Scalars['String']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  order?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<ActionUnit>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type ApprovalStepArgs = {
  action: ApprovalAction;
  approveBy?: Array<Scalars['String']['input']>;
  consentBy?: Array<Scalars['String']['input']>;
};

export type ApprovalStructureArgs = {
  fields?: InputMaybe<Array<ApprovalFieldArgs>>;
  steps?: InputMaybe<Array<ApprovalStepArgs>>;
  subscriber?: Array<Scalars['String']['input']>;
};

export enum ApprovalSubmitTypeEnum {
  Draft = 'Draft',
  Forward = 'Forward',
  Submit = 'Submit'
}

export type ApprovalSubscriberUpdateInput = {
  approvalId: Scalars['String']['input'];
  approvalsReferenceIds?: InputMaybe<Array<Scalars['String']['input']>>;
  relatedDepartmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  subscriberIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApprovalTableColumnArgs = {
  name: Scalars['String']['input'];
  required?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ApprovalTableRow = {
  actionAt?: Maybe<Scalars['Float']['output']>;
  actionBy?: Maybe<Scalars['String']['output']>;
  actionStepId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Array<ApprovalTableRowData>>;
  id: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  status: TableRowStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type ApprovalTableRowData = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  dataType: DataType;
  dateValue?: Maybe<Scalars['Float']['output']>;
  hintText?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  listValues?: Maybe<Array<Scalars['String']['output']>>;
  multiSelect: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  optionItems?: Maybe<Array<Scalars['String']['output']>>;
  order: Scalars['Float']['output'];
  required: Scalars['Boolean']['output'];
  textValue?: Maybe<Scalars['String']['output']>;
  timeInPast: Scalars['Boolean']['output'];
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export enum ApprovalType {
  CarBooking = 'CarBooking',
  Finance = 'Finance',
  OfficeShopping = 'OfficeShopping',
  Other = 'Other',
  RoomBooking = 'RoomBooking',
  WikiRelease = 'WikiRelease'
}

export type ApprovalUpdateInput = {
  approvalId: Scalars['String']['input'];
  approvalsReferenceIds?: InputMaybe<Array<Scalars['String']['input']>>;
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  budget?: InputMaybe<Array<BudgetInput>>;
  draftId?: InputMaybe<Scalars['String']['input']>;
  formFieldData?: InputMaybe<Scalars['JSON']['input']>;
  formId?: InputMaybe<Scalars['String']['input']>;
  forwardData?: InputMaybe<ApprovalForwardDataInput>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  relatedDepartmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  source: ApprovalSource;
  structure?: InputMaybe<ApprovalStructureArgs>;
  submitType?: InputMaybe<ApprovalSubmitTypeEnum>;
  subscriberIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Asset = {
  assignedDepartment?: Maybe<OfficeOrgChart>;
  assignedUser?: Maybe<OfficeUser>;
  attachments?: Maybe<Array<File>>;
  category?: Maybe<CategoryAsset>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  department?: Maybe<OfficeOrgChart>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<File>>;
  managementDepartment?: Maybe<OfficeOrgChart>;
  managementUser?: Maybe<OfficeUser>;
  monthlyDepreciation?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  providerText?: Maybe<Scalars['String']['output']>;
  purchaseAt?: Maybe<Scalars['Float']['output']>;
  serial?: Maybe<Scalars['String']['output']>;
  status?: Maybe<AssetStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  warehouse?: Maybe<WarehouseAsset>;
  warrantyByMonth?: Maybe<Scalars['Float']['output']>;
  warrantyExpiredAt?: Maybe<Scalars['Float']['output']>;
  warrantyStartedAt?: Maybe<Scalars['Float']['output']>;
};

export type AssetBulkUpsertInput = {
  assetCode?: InputMaybe<Scalars['String']['input']>;
  assignedDepartmentCode?: InputMaybe<Scalars['String']['input']>;
  assignedUserCode?: InputMaybe<Scalars['String']['input']>;
  categoryCode?: InputMaybe<Scalars['String']['input']>;
  /** mo ta */
  description?: InputMaybe<Scalars['String']['input']>;
  managementDepartmentCode?: InputMaybe<Scalars['String']['input']>;
  managementUserCode?: InputMaybe<Scalars['String']['input']>;
  /** khau hao */
  monthlyDepreciation?: InputMaybe<Scalars['String']['input']>;
  /** ten tai san */
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  /** nha cung cap */
  providerText?: InputMaybe<Scalars['String']['input']>;
  /** Ngày mua */
  purchaseDate?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  /** serial */
  serial?: InputMaybe<Scalars['String']['input']>;
  warehouseCode?: InputMaybe<Scalars['String']['input']>;
  warrantyByMonth?: InputMaybe<Scalars['String']['input']>;
  /** Hạn bảo hảnh */
  warrantyExpiredDate?: InputMaybe<Scalars['String']['input']>;
};

export type AssetBulkUpsertRecordResponse = {
  assetCode?: Maybe<Scalars['String']['output']>;
  assignedDepartmentCode?: Maybe<Scalars['String']['output']>;
  assignedUserCode?: Maybe<Scalars['String']['output']>;
  categoryCode?: Maybe<Scalars['String']['output']>;
  /** mo ta */
  description?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  managementDepartmentCode?: Maybe<Scalars['String']['output']>;
  managementUserCode?: Maybe<Scalars['String']['output']>;
  /** khau hao */
  monthlyDepreciation?: Maybe<Scalars['String']['output']>;
  /** ten tai san */
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['String']['output']>;
  /** nha cung cap */
  providerText?: Maybe<Scalars['String']['output']>;
  /** Ngày mua */
  purchaseDate?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['String']['output']>;
  /** serial */
  serial?: Maybe<Scalars['String']['output']>;
  warehouseCode?: Maybe<Scalars['String']['output']>;
  warrantyByMonth?: Maybe<Scalars['String']['output']>;
  /** han bao hanh */
  warrantyExpiredAt?: Maybe<Scalars['Float']['output']>;
  /** Hạn bảo hảnh */
  warrantyExpiredDate?: Maybe<Scalars['String']['output']>;
};

export type AssetBulkUpsertResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<AssetBulkUpsertRecordResponse>>;
  total: Scalars['Int']['output'];
};

export enum AssetCategoryUnit {
  Bag = 'Bag',
  Basket = 'Basket',
  Bottle = 'Bottle',
  Box = 'Box',
  Bundle = 'Bundle',
  Can = 'Can',
  Carton = 'Carton',
  Case = 'Case',
  Combo = 'Combo',
  Drum = 'Drum',
  Package = 'Package',
  Pair = 'Pair',
  Pallet = 'Pallet',
  Piece = 'Piece',
  Roll = 'Roll',
  Set = 'Set',
  Sheet = 'Sheet'
}

export type AssetCreateInput = {
  /** Phòng ban */
  assignedDepartmentId?: InputMaybe<Scalars['String']['input']>;
  assignedUserId?: InputMaybe<Scalars['String']['input']>;
  /** file dinh kem */
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** danh muc tai san */
  categoryId: Scalars['String']['input'];
  /** mo ta */
  description?: InputMaybe<Scalars['String']['input']>;
  /** anh tai san */
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Phòng ban */
  managementDepartmentId?: InputMaybe<Scalars['String']['input']>;
  managementUserId?: InputMaybe<Scalars['String']['input']>;
  /** khau hao */
  monthlyDepreciation?: InputMaybe<Scalars['Int']['input']>;
  /** ten tai san */
  name: Scalars['String']['input'];
  /** gia mua */
  price?: InputMaybe<Scalars['Float']['input']>;
  /** nha cung cap */
  providerText?: InputMaybe<Scalars['String']['input']>;
  /** Ngày mua */
  purchaseAt: Scalars['Float']['input'];
  /** so luong */
  quantity: Scalars['Float']['input'];
  /** serial */
  serial?: InputMaybe<Scalars['String']['input']>;
  /** kho luu tru */
  warehouseId?: InputMaybe<Scalars['String']['input']>;
  /** thoi gian bao hanh theo thang */
  warrantyByMonth?: InputMaybe<Scalars['Int']['input']>;
  /** han bao hanh */
  warrantyExpiredAt?: InputMaybe<Scalars['Float']['input']>;
};

export type AssetListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<Asset>>;
  total: Scalars['Int']['output'];
};

export enum AssetStatus {
  InStock = 'InStock',
  InUse = 'InUse'
}

export type AssetUpdateInput = {
  /** Phòng ban */
  assignedDepartmentId?: InputMaybe<Scalars['String']['input']>;
  assignedUserId?: InputMaybe<Scalars['String']['input']>;
  /** file dinh kem */
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** mo ta */
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  /** anh tai san */
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Phòng ban */
  managementDepartmentId?: InputMaybe<Scalars['String']['input']>;
  managementUserId?: InputMaybe<Scalars['String']['input']>;
  /** khau hao */
  monthlyDepreciation?: InputMaybe<Scalars['Int']['input']>;
  /** ten tai san */
  name?: InputMaybe<Scalars['String']['input']>;
  /** gia mua */
  price?: InputMaybe<Scalars['Float']['input']>;
  /** nha cung cap */
  providerText?: InputMaybe<Scalars['String']['input']>;
  /** Ngày mua */
  purchaseAt?: InputMaybe<Scalars['Float']['input']>;
  /** serial */
  serial?: InputMaybe<Scalars['String']['input']>;
  /** kho luu tru */
  warehouseId?: InputMaybe<Scalars['String']['input']>;
  /** thoi gian bao hanh theo thang */
  warrantyByMonth?: InputMaybe<Scalars['Int']['input']>;
  /** han bao hanh */
  warrantyExpiredAt?: InputMaybe<Scalars['Float']['input']>;
};

export type Bank = {
  brandName?: Maybe<Scalars['String']['output']>;
  en_name?: Maybe<Scalars['String']['output']>;
  headquarter?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  swiffCode?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  vn_name?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type BankAccount = {
  accountHolder?: Maybe<Scalars['String']['output']>;
  accountNumber?: Maybe<Scalars['String']['output']>;
  bankBranch?: Maybe<Scalars['String']['output']>;
  bankId?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  cardNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
};

export type BankFilterArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type BankResponse = {
  banks?: Maybe<Array<Bank>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum BlockFieldType {
  Default = 'Default',
  Resign = 'Resign'
}

export type BookCarArgs = {
  carType: Scalars['String']['input'];
  destinationAddress: Scalars['String']['input'];
  endAt: Scalars['Float']['input'];
  leaderId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  pickupAddress: Scalars['String']['input'];
  startAt: Scalars['Float']['input'];
};

export type BookCarRepeatConfigInput = {
  endAt?: InputMaybe<Scalars['Float']['input']>;
  monthDays?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodType?: InputMaybe<CloneDatePeriodEnum>;
  startAt?: InputMaybe<Scalars['Float']['input']>;
  timeZone?: InputMaybe<Scalars['Float']['input']>;
  weekDays?: InputMaybe<Array<DayOfWeek>>;
};

export type BookMeetingRoomArgs = {
  endAt: Scalars['Float']['input'];
  equiments?: Array<EquimentsForMettingRoom>;
  formFieldData?: InputMaybe<Scalars['JSON']['input']>;
  hostId: Scalars['String']['input'];
  logistics?: Array<LogisticsForMettingRoom>;
  meetingContent: Scalars['String']['input'];
  meetingRoomId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  notify?: InputMaybe<NotificationCampaignDifferentArgs>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  participantIds?: InputMaybe<Array<Scalars['String']['input']>>;
  quantity: Scalars['Int']['input'];
  repeatConfig?: InputMaybe<BookMeetingRoomRepeatConfigInput>;
  /** legacy */
  repeatedDays?: InputMaybe<Array<RepeatedDay>>;
  /** legacy */
  repeatedEndAt?: InputMaybe<Scalars['Float']['input']>;
  startAt: Scalars['Float']['input'];
  subscriberIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type BookMeetingRoomRepeatConfigInput = {
  endAt?: InputMaybe<Scalars['Float']['input']>;
  monthDays?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodType?: InputMaybe<CloneDatePeriodEnum>;
  startAt?: InputMaybe<Scalars['Float']['input']>;
  timeZone?: InputMaybe<Scalars['Float']['input']>;
  weekDays?: InputMaybe<Array<DayOfWeek>>;
};

export type BookMeetingRoomsResponse = {
  booking?: Maybe<BookingMeetingRoom>;
};

export type BookingCar = {
  admin?: Maybe<OfficeUser>;
  bookedBy?: Maybe<OfficeUser>;
  carType?: Maybe<Scalars['String']['output']>;
  destinationAddress: Scalars['String']['output'];
  endAt?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  leader?: Maybe<OfficeUser>;
  note?: Maybe<Scalars['String']['output']>;
  noteFromAdmin?: Maybe<Scalars['String']['output']>;
  noteFromLeader?: Maybe<Scalars['String']['output']>;
  pickupAddress?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<BookingCarProgress>;
  startAt?: Maybe<Scalars['Float']['output']>;
};

export type BookingCarFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  progress?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export enum BookingCarProgress {
  Approve = 'Approve',
  Canceled = 'Canceled',
  Leader_Approve = 'Leader_Approve',
  Reject = 'Reject',
  Waiting_For_Approval = 'Waiting_For_Approval'
}

export type BookingCarResponse = {
  booking?: Maybe<BookingCar>;
};

export type BookingMeetingRoom = {
  approvalId?: Maybe<Scalars['String']['output']>;
  bookedBy?: Maybe<OfficeUser>;
  bookingApproval?: Maybe<OfficeApproval>;
  cancelDescription?: Maybe<Scalars['String']['output']>;
  canceledAt?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  endAt?: Maybe<Scalars['Float']['output']>;
  equiments?: Maybe<Array<EquimentsForMettingRoom>>;
  host?: Maybe<OfficeUser>;
  id: Scalars['String']['output'];
  logistics?: Maybe<Array<LogisticsForMettingRoom>>;
  meetingContent?: Maybe<Scalars['String']['output']>;
  meetingRoom?: Maybe<MeetingRoom>;
  no?: Maybe<Scalars['Float']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  notify?: Maybe<NotificationCampaign>;
  orgChart?: Maybe<OfficeOrgChart>;
  participants?: Maybe<Array<OfficeUser>>;
  quantity?: Maybe<Scalars['Int']['output']>;
  repeatConfig?: Maybe<CloneByDate>;
  repeatedDays?: Maybe<Array<Scalars['Int']['output']>>;
  repeatedEndAt?: Maybe<Scalars['Float']['output']>;
  requester?: Maybe<OfficeUser>;
  room?: Maybe<MeetingRoom>;
  startAt?: Maybe<Scalars['Float']['output']>;
  status: RequestStatus;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type BookingScheduleNotifyInput = {
  attachFileIds?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  endAt?: InputMaybe<Scalars['Float']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  monthDays?: InputMaybe<Array<Scalars['Int']['input']>>;
  objectType?: InputMaybe<NotificationObjectType>;
  phones?: InputMaybe<Array<Scalars['String']['input']>>;
  scheduleId: Scalars['String']['input'];
  startAt?: InputMaybe<Scalars['Float']['input']>;
  startTimeInMinutes?: InputMaybe<Scalars['IntOrAInt']['input']>;
  status?: InputMaybe<NotificationCampaignStatus>;
  timeZone?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<NotificationScheduleType>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
  weekDays?: InputMaybe<Array<DayOfWeek>>;
};

export type BookingScheduleRemoveInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  scheduleId: Scalars['String']['input'];
};

export type BookingScheduleUpdateInput = {
  endAt: Scalars['Float']['input'];
  equiments?: Array<EquimentsForMettingRoom>;
  formFieldData?: InputMaybe<Scalars['JSON']['input']>;
  hostId: Scalars['String']['input'];
  logistics?: Array<LogisticsForMettingRoom>;
  meetingContent: Scalars['String']['input'];
  meetingRoomId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  notify?: InputMaybe<NotificationCampaignDifferentArgs>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  participantIds?: InputMaybe<Array<Scalars['String']['input']>>;
  quantity: Scalars['Int']['input'];
  scheduleId: Scalars['String']['input'];
  startAt: Scalars['Float']['input'];
  subscriberIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type BookingsCarResponse = PagingData & {
  bookings?: Maybe<Array<BookingCar>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Budget = {
  outOfBudget?: Maybe<Scalars['Float']['output']>;
  withinBudget?: Maybe<Scalars['Float']['output']>;
};

export type BudgetInput = {
  outOfBudget?: InputMaybe<Scalars['Float']['input']>;
  withinBudget?: InputMaybe<Scalars['Float']['input']>;
};

export type BulkImportEmployeeResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<ImportEmployeeResponse>>;
  total: Scalars['Int']['output'];
};

export type BulkUpsertBlockResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<UpsertBlockResponse>>;
  total: Scalars['Int']['output'];
};

export type BulkUpsertEmployeeDataResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<UpsertEmployeeDataResponse>>;
  total: Scalars['Int']['output'];
};

export type BulkUpsertFieldResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<UpsertFieldResponse>>;
  total: Scalars['Int']['output'];
};

export type BulkUpsertOrgChartResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<UpsertOrgChartResponse>>;
  total: Scalars['Int']['output'];
};

export type BulkUpsertTitleResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<UpsertTitleResponse>>;
  total: Scalars['Int']['output'];
};

export type BusinessRole = {
  address?: Maybe<Address>;
  agreementUrl?: Maybe<Scalars['String']['output']>;
  bankAccount?: Maybe<BankAccount>;
  businessOrganization?: Maybe<Organization>;
  code?: Maybe<Scalars['String']['output']>;
  contentUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  permissions?: Maybe<Array<Permission>>;
  policies?: Maybe<Array<Policy>>;
  status: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type BusinessRoleCreateArgs = {
  actionIds: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type BusinessRoleResponse = {
  businessRoles?: Maybe<Array<BusinessRole>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type BusinessRoleUpdateArgs = {
  actionIds: Array<Scalars['String']['input']>;
  businessRoleId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CallLogResponse = {
  action?: Maybe<Scalars['String']['output']>;
  callStatus?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

export type CallReceiverArgs = {
  userId: Scalars['String']['input'];
};

export type CallRecord = {
  caller: OfficeUser;
  createdAt: Scalars['Float']['output'];
  createdBy: Scalars['Int']['output'];
  endAt?: Maybe<Scalars['Float']['output']>;
  historyType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  invalidUserIds?: Maybe<Array<Scalars['String']['output']>>;
  isGroupCall: Scalars['Boolean']['output'];
  logs: Array<CallLogResponse>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  receivers?: Maybe<Array<OfficeUser>>;
  recording: Scalars['Boolean']['output'];
  recordingFilePaths?: Maybe<Array<Scalars['String']['output']>>;
  recordingFileUrls?: Maybe<Array<Scalars['String']['output']>>;
  recordingResourceId?: Maybe<Scalars['String']['output']>;
  recordingSid?: Maybe<Scalars['String']['output']>;
  recordingStatus: RecordingStatus;
  requestId?: Maybe<Scalars['String']['output']>;
  startAt?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  type: CallType;
  updatedAt: Scalars['Float']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type CallTokenResponse = {
  appId?: Maybe<Scalars['String']['output']>;
  callTimeout?: Maybe<Scalars['Float']['output']>;
  callToken?: Maybe<Scalars['String']['output']>;
  incallTimeout?: Maybe<Scalars['Float']['output']>;
  ringingTimeout?: Maybe<Scalars['Float']['output']>;
  tokenExpireAt?: Maybe<Scalars['Float']['output']>;
  uId?: Maybe<Scalars['Int']['output']>;
};

export enum CallType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO'
}

export type Car = {
  approvalForm?: Maybe<ApprovalForm>;
  approvalFormId?: Maybe<Scalars['String']['output']>;
  capacity?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  driver?: Maybe<OfficeUser>;
  driverId: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  orgChartId?: Maybe<Scalars['String']['output']>;
  plateNumber: Scalars['String']['output'];
  status?: Maybe<ObjectStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CarBookingRequest = {
  approvalId?: Maybe<Scalars['String']['output']>;
  bookingApproval?: Maybe<OfficeApproval>;
  cancelDescription?: Maybe<Scalars['String']['output']>;
  car?: Maybe<Car>;
  carId: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  endAt: Scalars['Float']['output'];
  fromAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  requester?: Maybe<OfficeUser>;
  startAt: Scalars['Float']['output'];
  status: RequestStatus;
  toAddress: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CarBookingSchedule = {
  booking?: Maybe<CarBookingRequest>;
  bookingRequest?: Maybe<CarBookingRequest>;
  cancelDescription?: Maybe<Scalars['String']['output']>;
  car?: Maybe<Car>;
  carId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  endAt: Scalars['Float']['output'];
  fromAddress?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  remindAt?: Maybe<Scalars['Float']['output']>;
  requestId: Scalars['String']['output'];
  startAt: Scalars['Float']['output'];
  toAddress?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CarBookingScheduleFilter = {
  carIds?: InputMaybe<Array<Scalars['String']['input']>>;
  fromDate?: InputMaybe<Scalars['Float']['input']>;
  owner?: Scalars['Boolean']['input'];
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  toDate?: InputMaybe<Scalars['Float']['input']>;
};

export type CarBookingScheduleRemoveInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  scheduleId: Scalars['String']['input'];
};

export type CarBookingScheduleResponse = PagingData & {
  count: Scalars['Int']['output'];
  schedules?: Maybe<Array<CarBookingSchedule>>;
  total: Scalars['Int']['output'];
};

export type CarBookingScheduleUpdateInput = {
  carId: Scalars['String']['input'];
  endAt: Scalars['Float']['input'];
  formFieldData?: InputMaybe<Scalars['JSON']['input']>;
  fromAddress: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  notify?: InputMaybe<NotificationCampaignDifferentArgs>;
  scheduleId: Scalars['String']['input'];
  startAt: Scalars['Float']['input'];
  subscriberIds?: InputMaybe<Array<Scalars['String']['input']>>;
  toAddress: Scalars['String']['input'];
};

export type CarResponse = PagingData & {
  cars?: Maybe<Array<Car>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Carrier = {
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CarrierFilterArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type CarrierResponse = {
  carriers?: Maybe<Array<Carrier>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum CaseQueryMeeting {
  All = 'All',
  OnlyMe = 'OnlyMe'
}

export type CategoryAsset = {
  assets?: Maybe<Array<Asset>>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  unit?: Maybe<AssetCategoryUnit>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CategoryAssetListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<CategoryAsset>>;
  total: Scalars['Int']['output'];
};

export type CategoryWiki = {
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  status: ActiveStatus;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CategoryWikiResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<CategoryWiki>>;
  total: Scalars['Int']['output'];
};

export type ChatAddMessageInput = {
  conversationId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Float']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  forwardedFromMessageId?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  receiverId?: InputMaybe<Scalars['String']['input']>;
  replyMessageId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ChatMessageType>;
  urls?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum ChatConversationGroupType {
  Private = 'Private',
  Public = 'Public'
}

export type ChatConversationListFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ChatConversationType>;
};

export type ChatConversationListResponse = {
  conversations?: Maybe<Array<OfficeChatConversation>>;
  total?: Maybe<Scalars['Float']['output']>;
};

export enum ChatConversationType {
  Direct = 'Direct',
  Group = 'Group'
}

export type ChatGroupAddInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  groupType?: InputMaybe<ChatConversationGroupType>;
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  memberIds: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ChatGroupEditInput = {
  adminIds?: InputMaybe<Array<Scalars['String']['input']>>;
  backgroundUrl?: InputMaybe<Scalars['String']['input']>;
  conversationId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  groupType?: InputMaybe<ChatConversationGroupType>;
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  memberIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ChatGroupLeaveArgs = {
  conversationId: Scalars['String']['input'];
};

export enum ChatMessageAct {
  DEL = 'DEL',
  EDIT = 'EDIT'
}

export type ChatMessageGetListFilter = {
  conversationId: Scalars['String']['input'];
  from?: InputMaybe<Scalars['Float']['input']>;
  lastKey?: InputMaybe<LastKeyChatMessage>;
  order?: OrderBy;
  size?: Scalars['Int']['input'];
  type?: InputMaybe<ChatMessageType>;
};

export type ChatMessageListResponse = {
  lastKey?: Maybe<LastKeyChatMessageListResponse>;
  messages?: Maybe<Array<OfficeChatMessage>>;
};

export enum ChatMessageReactionAct {
  ADD = 'ADD',
  REVOKE = 'REVOKE'
}

export enum ChatMessageType {
  AUDIO = 'AUDIO',
  CALL = 'CALL',
  DOC = 'DOC',
  IMAGE = 'IMAGE',
  LOCATION = 'LOCATION',
  LOG = 'LOG',
  STICKER = 'STICKER',
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  VOICE_NOTE = 'VOICE_NOTE'
}

export type ChatMessageUpdateArgs = {
  act: ChatMessageAct;
  message?: InputMaybe<Scalars['String']['input']>;
  messageId: Scalars['String']['input'];
};

export type ChatMessageUpdateReactionArgs = {
  act: ChatMessageReactionAct;
  code: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};

export type ChatMessageUpdateReadArgs = {
  conversationId: Scalars['String']['input'];
  readCount: Scalars['Int']['input'];
};

export type ChatMessageUpdateReadResponse = {
  conversationId?: Maybe<Scalars['String']['output']>;
};

export type ChatNotifyUserData = {
  content: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  receiverIds: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type ChatSearchArgs = {
  conversationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  conversationTypes?: InputMaybe<Array<ChatConversationType>>;
  from?: InputMaybe<Scalars['Float']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  messageTypes?: InputMaybe<Array<ChatMessageType>>;
  page?: Scalars['Int']['input'];
  receiverIds?: InputMaybe<Array<Scalars['String']['input']>>;
  senderIds?: InputMaybe<Array<Scalars['String']['input']>>;
  size?: Scalars['Int']['input'];
  to?: InputMaybe<Scalars['Float']['input']>;
};

export enum ChatType {
  Conversation = 'Conversation',
  Group = 'Group'
}

export type CheckIn = {
  checkInDetail?: Maybe<CheckInDetail>;
  checkInOwner?: Maybe<OfficeUser>;
  checkInTime?: Maybe<Scalars['Int']['output']>;
  checkOutDetail?: Maybe<CheckInDetail>;
  code: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Array<CheckInDetail>>;
  id: Scalars['String']['output'];
  info?: Maybe<CheckInInfo>;
  reasonStatus?: Maybe<Scalars['String']['output']>;
  status: CheckInStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CheckInBeacon = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  orgChart?: Maybe<OfficeOrgChart>;
  place?: Maybe<CheckInPlace>;
  status: ObjectStatus;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<OfficeSysUser>;
};

export type CheckInBeaconArgs = {
  checkInDetailId?: InputMaybe<Scalars['String']['input']>;
  major: Scalars['Int']['input'];
  minor: Scalars['Int']['input'];
};

export type CheckInBeaconResponse = PagingData & {
  count: Scalars['Int']['output'];
  data: Array<CheckInBeacon>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CheckInDetail = {
  beaconId?: Maybe<Scalars['String']['output']>;
  checkInCode?: Maybe<Scalars['String']['output']>;
  checkInId: Scalars['String']['output'];
  checkInOwner?: Maybe<OfficeUser>;
  checkInPlace?: Maybe<CheckInPlace>;
  checkInType?: Maybe<CheckInTypeEnum>;
  checkInUpTime?: Maybe<CheckInUpTime>;
  checkInUpTimeId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  latitude?: Maybe<Scalars['Float']['output']>;
  logStatus?: Maybe<CheckInLogStatusEnum>;
  longitude?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  placeId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CheckInHistoryFilter = {
  fromDate?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<CheckInStatus>;
  toDate?: InputMaybe<Scalars['Float']['input']>;
};

export type CheckInInfo = {
  isValid: Scalars['Boolean']['output'];
  workingTime: Scalars['Int']['output'];
};

export enum CheckInLogStatusEnum {
  Error_Network = 'Error_Network',
  Invalid_Beacon = 'Invalid_Beacon',
  Success = 'Success',
  WakeUp = 'WakeUp'
}

export type CheckInPlace = {
  address?: Maybe<Scalars['String']['output']>;
  addressZoneId?: Maybe<Scalars['String']['output']>;
  /** Thời gian hiệu chỉnh */
  checkInUpdatedAt?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  /** Chu kỳ lặp lại gửi noti wakeup */
  cycleRepeat?: Maybe<Scalars['Int']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  districtId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  ipValidation: Scalars['Boolean']['output'];
  isActive: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  listBeacon?: Maybe<Array<CheckInBeacon>>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  province?: Maybe<Scalars['String']['output']>;
  provinceId?: Maybe<Scalars['String']['output']>;
  publicIPs?: Maybe<Array<Scalars['String']['output']>>;
  status: ObjectStatus;
  timeUpList?: Maybe<Array<CheckInUpTime>>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  ward?: Maybe<Scalars['String']['output']>;
  wardId?: Maybe<Scalars['String']['output']>;
};

export type CheckInPlaceArgs = {
  address: Scalars['String']['input'];
  addressZoneId: Scalars['String']['input'];
  beaconIds?: InputMaybe<Array<Scalars['String']['input']>>;
  ipValidation?: Scalars['Boolean']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type CheckInPlaceFilter = {
  districtId?: InputMaybe<Scalars['String']['input']>;
  ipValidation?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  provinceId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<CheckInPlaceTypeFilter>;
  wardId?: InputMaybe<Scalars['String']['input']>;
};

export type CheckInPlaceResponse = PagingData & {
  count: Scalars['Int']['output'];
  places?: Maybe<Array<CheckInPlace>>;
  total: Scalars['Int']['output'];
};

export enum CheckInPlaceTypeFilter {
  BEACON = 'BEACON',
  DEFAULT = 'DEFAULT'
}

export type CheckInResponse = PagingData & {
  checkIns?: Maybe<Array<CheckIn>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum CheckInStatus {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Request = 'Request'
}

export enum CheckInTypeEnum {
  Beacon = 'Beacon',
  Place = 'Place'
}

export type CheckInUpTime = {
  checkInDetails?: Maybe<Array<CheckInDetail>>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  orgChart?: Maybe<OfficeOrgChart>;
  place?: Maybe<CheckInPlace>;
  timeEnd?: Maybe<Scalars['Int']['output']>;
  timeStart?: Maybe<Scalars['Int']['output']>;
  timezone?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CheckInUpTimeInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  timeEnd: Scalars['Int']['input'];
  timeStart: Scalars['Int']['input'];
  timezone?: Scalars['Int']['input'];
};

export type CloneByDate = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  customDays?: Maybe<Array<CustomDayTaskReportConfig>>;
  endAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  monthDays?: Maybe<Array<Scalars['Int']['output']>>;
  periodType: CloneDatePeriodEnum;
  relationData?: Maybe<Scalars['JSON']['output']>;
  startAt?: Maybe<Scalars['Float']['output']>;
  startTimeIn?: Maybe<Array<Scalars['Int']['output']>>;
  timeZone?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  weekDays?: Maybe<Array<DayOfWeek>>;
};

export enum CloneDatePeriodEnum {
  Custom = 'Custom',
  Daily = 'Daily',
  Monthly = 'Monthly',
  Now = 'Now',
  Quarterly = 'Quarterly',
  Weekly = 'Weekly',
  Yearly = 'Yearly'
}

export type CmsUserLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Configuration = {
  businessRoles?: Maybe<Array<BusinessRole>>;
  createdAt: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  menu?: Maybe<Array<ConfigurationMenu>>;
  updatedAt: Scalars['Float']['output'];
};

export type ConfigurationMenu = {
  businessRole: BusinessRole;
  createdAt: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  items?: Maybe<Array<ConfigurationMenuItem>>;
  updatedAt: Scalars['Float']['output'];
};

export type ConfigurationMenuItem = {
  childs?: Maybe<Array<ConfigurationMenuItem>>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  paren?: Maybe<ConfigurationMenuItem>;
  updatedAt: Scalars['Float']['output'];
};

export enum ConversationActionType {
  ADD_MEMBER = 'ADD_MEMBER',
  CHANGE_AVATAR = 'CHANGE_AVATAR',
  CHANGE_BACKGROUND = 'CHANGE_BACKGROUND',
  CHANGE_NAME = 'CHANGE_NAME',
  CREATE_CONVERSATION = 'CREATE_CONVERSATION',
  DEMOTE_ADMIN = 'DEMOTE_ADMIN',
  LEAVE_CONVERSATION = 'LEAVE_CONVERSATION',
  PIN_MESSAGE = 'PIN_MESSAGE',
  PROMOTE_ADMIN = 'PROMOTE_ADMIN',
  REMOVE_MEMBER = 'REMOVE_MEMBER',
  UNPIN_MESSAGE = 'UNPIN_MESSAGE'
}

export enum CourseJoinTypeEnum {
  ASSIGN = 'ASSIGN',
  FREE = 'FREE'
}

export enum CourseProposerTypeEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum CourseStatusEnum {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  ENDED = 'ENDED',
  INACTIVE = 'INACTIVE',
  REPORTED = 'REPORTED'
}

export enum CourseTrainTypeEnum {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE'
}

export type CreateMeetingRoomArgs = {
  approvalFormId?: InputMaybe<Scalars['String']['input']>;
  capacity: Scalars['Int']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  status?: InputMaybe<ObjectStatus>;
};

export type CustomDayTaskReportConfig = {
  days?: Maybe<Array<Scalars['Int']['output']>>;
  month?: Maybe<Scalars['Int']['output']>;
};

export type CustomDayTaskReportConfigInput = {
  days?: InputMaybe<Array<Scalars['Int']['input']>>;
  month?: InputMaybe<Scalars['Int']['input']>;
};

export enum DataType {
  Date = 'Date',
  Email = 'Email',
  List = 'List',
  Number = 'Number',
  Number_Limit_Length_10 = 'Number_Limit_Length_10',
  Table = 'Table',
  Text = 'Text',
  Text_Area = 'Text_Area',
  Text_Html = 'Text_Html'
}

export type DatePeriod = {
  end?: InputMaybe<Scalars['Float']['input']>;
  start?: InputMaybe<Scalars['Float']['input']>;
};

export enum DayOfWeek {
  Fri = 'Fri',
  Mon = 'Mon',
  Sat = 'Sat',
  Sun = 'Sun',
  Thu = 'Thu',
  Tue = 'Tue',
  Wed = 'Wed'
}

export type DeleteBookingMeetingRoomArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type DeleteHistoryArgs = {
  conversationId: Scalars['String']['input'];
};

export type DeleteMeetingRoomArgs = {
  id: Scalars['String']['input'];
};

export type DocumentElementFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type DocumentElementResponse = PagingData & {
  count: Scalars['Int']['output'];
  elements?: Maybe<Array<FolderElement>>;
  total: Scalars['Int']['output'];
  userPermissions?: Maybe<UserDocumentPermissionResponse>;
};

export type DocumentFile = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  encoding?: Maybe<Scalars['String']['output']>;
  folder?: Maybe<DocumentFolder>;
  folderId: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  mimetype?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  pathName?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type DocumentFolder = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  departments?: Maybe<Array<OfficeOrgChart>>;
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  parentFolder?: Maybe<DocumentFolder>;
  parentId: Scalars['String']['output'];
  path: Scalars['String']['output'];
  pathName?: Maybe<Scalars['String']['output']>;
  scope: DocumentScope;
  unreadWikiCount?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<OfficeUser>>;
  wikis?: Maybe<DocumentWiki>;
};

export type DocumentFolderArgs = {
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  scope?: DocumentScope;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentFolderResponse = PagingData & {
  count: Scalars['Int']['output'];
  folders?: Maybe<Array<DocumentFolder>>;
  total: Scalars['Int']['output'];
};

export type DocumentOrderBy = {
  field: DocumentSortableField;
  order?: OrderBy;
};

export enum DocumentScope {
  Private = 'Private',
  Public = 'Public'
}

export enum DocumentSortableField {
  Mimetype = 'mimetype',
  ModifiedAt = 'modifiedAt',
  Name = 'name',
  Size = 'size',
  Type = 'type'
}

export type DocumentTagCreateInput = {
  name: Scalars['String']['input'];
};

export type DocumentTagFilterInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentTagResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<TagDocument>>;
  total: Scalars['Int']['output'];
};

export type DocumentTagUpdateInput = {
  name: Scalars['String']['input'];
  tagId?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentTagUpsertInput = {
  name: Scalars['String']['input'];
  tagId?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentWiki = {
  approvalVersion?: Maybe<VersionWiki>;
  categories?: Maybe<Array<CategoryWiki>>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  folder?: Maybe<DocumentFolder>;
  id: Scalars['String']['output'];
  important?: Maybe<WikiImportant>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  latestVersion?: Maybe<VersionWiki>;
  name?: Maybe<Scalars['String']['output']>;
  no: Scalars['Float']['output'];
  status?: Maybe<WikiStatus>;
  tags?: Maybe<Array<TagDocument>>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  userCreator?: Maybe<OfficeUser>;
  userPermissions?: Maybe<UserDocumentPermissionResponse>;
  versions?: Maybe<Array<VersionWiki>>;
  viewCount?: Maybe<Scalars['Float']['output']>;
};

export type DocumentWikiListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<DocumentWiki>>;
  total: Scalars['Int']['output'];
};

export type EditApprovalFormArgs = {
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  fields?: InputMaybe<Array<ApprovalFormFieldArgs>>;
  formGroupIds?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
  steps?: InputMaybe<Array<ApprovalFormStepArgs>>;
  subscriber?: InputMaybe<Array<Scalars['String']['input']>>;
  typeId?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EditCheckInBeaconArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  placeId?: InputMaybe<Scalars['String']['input']>;
};

export type EditCheckInPlaceArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressZoneId?: InputMaybe<Scalars['String']['input']>;
  beaconIds?: InputMaybe<Array<Scalars['String']['input']>>;
  checkInUpdatedAt?: InputMaybe<Scalars['Float']['input']>;
  checkInUptimes?: InputMaybe<Array<CheckInUpTimeInput>>;
  cycleRepeat?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  ipValidation?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type EditDocumentFolderArgs = {
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<DocumentScope>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EditEmployeeArgs = {
  accountHolder?: InputMaybe<Scalars['String']['input']>;
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  addressZoneId?: InputMaybe<Scalars['String']['input']>;
  attachFileIds?: InputMaybe<Array<Scalars['String']['input']>>;
  bankBranch?: InputMaybe<Scalars['String']['input']>;
  bankId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  companyId: Scalars['String']['input'];
  data?: InputMaybe<Scalars['JSON']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Float']['input']>;
  departments?: InputMaybe<Array<EmployeeDepartmentArgs>>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  hrCode?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  idCardIssuedOn?: InputMaybe<Scalars['Float']['input']>;
  idCardIssuedPlace?: InputMaybe<Scalars['String']['input']>;
  identityCard?: InputMaybe<Scalars['String']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  lastWorkingOn?: InputMaybe<Scalars['Float']['input']>;
  leaderId?: InputMaybe<Scalars['String']['input']>;
  leaveOn?: InputMaybe<Scalars['Float']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  officalWorkingOn?: InputMaybe<Scalars['Float']['input']>;
  onboardingOn?: InputMaybe<Scalars['Float']['input']>;
  personalEmail?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  relativePhone?: InputMaybe<Scalars['String']['input']>;
  resignationDetailReason?: InputMaybe<Scalars['String']['input']>;
  resignationReason?: InputMaybe<Scalars['String']['input']>;
  resignationType?: InputMaybe<Scalars['String']['input']>;
  resigned?: InputMaybe<Scalars['Boolean']['input']>;
  socialInsuranceCode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  tempAddress?: InputMaybe<Scalars['String']['input']>;
  tempAddressZoneId?: InputMaybe<Scalars['String']['input']>;
};

export type EditInfoBlockArgs = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type EditInfoFieldArgs = {
  dataType?: InputMaybe<DataType>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  optionItems?: InputMaybe<Array<Scalars['String']['input']>>;
  order?: InputMaybe<Scalars['Float']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type EditOfficeCarArgs = {
  approvalFormId?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['Int']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  model?: InputMaybe<Scalars['String']['input']>;
  orgChartId?: InputMaybe<Scalars['String']['input']>;
  plateNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type EditOfficeTitleArgs = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type EditOrgChartArgs = {
  approverId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type EditSysUserArgs = {
  businessRoleId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  orgChartIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<ObjectStatus>;
};

export type EmployeeBulkCreateImport = {
  accountHolder?: InputMaybe<Scalars['String']['input']>;
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  bankBranch?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  hrCode?: InputMaybe<Scalars['String']['input']>;
  idCardIssuedOn?: InputMaybe<Scalars['String']['input']>;
  idCardIssuedPlace?: InputMaybe<Scalars['String']['input']>;
  identityCard?: InputMaybe<Scalars['String']['input']>;
  leaderCode?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  officalWorkingOn?: InputMaybe<Scalars['String']['input']>;
  onboardingOn?: InputMaybe<Scalars['String']['input']>;
  personalEmail?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  relativePhone?: InputMaybe<Scalars['String']['input']>;
  socialInsuranceCode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  ward?: InputMaybe<Scalars['String']['input']>;
};

export type EmployeeBulkCreateResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<ImportBulkCreateResponse>>;
  total: Scalars['Int']['output'];
};

export type EmployeeDepartmentArgs = {
  companyId?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  titleId?: InputMaybe<Scalars['String']['input']>;
};

export type EmployeeReportFilterArgs = {
  l1Id?: InputMaybe<Scalars['String']['input']>;
  l2Id?: InputMaybe<Scalars['String']['input']>;
  l3Id?: InputMaybe<Scalars['String']['input']>;
  l4Id?: InputMaybe<Scalars['String']['input']>;
  l5Id?: InputMaybe<Scalars['String']['input']>;
  l6Id?: InputMaybe<Scalars['String']['input']>;
  lCurrentId?: InputMaybe<Scalars['String']['input']>;
  lastWorkingOn?: InputMaybe<DatePeriod>;
  leaveOn?: InputMaybe<DatePeriod>;
  major?: InputMaybe<Scalars['String']['input']>;
  onboardingOn?: InputMaybe<DatePeriod>;
  orderBy?: InputMaybe<OrderUserBy>;
  resignationReason?: InputMaybe<Scalars['String']['input']>;
  resignationType?: InputMaybe<Scalars['String']['input']>;
  seniority?: InputMaybe<Scalars['Int']['input']>;
  titleId?: InputMaybe<Scalars['String']['input']>;
};

export enum EquimentsForMettingRoom {
  Internet = 'Internet',
  OnlineMeetingHCM = 'OnlineMeetingHCM',
  Projector = 'Projector'
}

export type FieldsListResponse = {
  fields?: Maybe<Array<Scalars['String']['output']>>;
};

export type File = {
  createdAt: Scalars['Float']['output'];
  encoding?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  mimetype?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  thumbnails?: Maybe<Array<FileThumbnail>>;
  updatedAt: Scalars['Float']['output'];
};

export type FileResponse = PagingData & {
  count: Scalars['Int']['output'];
  files?: Maybe<Array<File>>;
  total: Scalars['Int']['output'];
};

export type FileThumbnail = {
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type FolderElement = {
  approvalVersion?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  mimetype?: Maybe<Scalars['String']['output']>;
  modifiedAt?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  pathName?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
  wiki?: Maybe<DocumentWiki>;
};

export type GeneratePresignedUrlParams = {
  fileName: Scalars['String']['input'];
  fileType: Scalars['String']['input'];
  thumbnailsArg?: InputMaybe<Array<ThumbnailParams>>;
};

export type GeneratePresignedUrlResponse = {
  expiredIn: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  path: Scalars['String']['output'];
  presignedUrl: Scalars['String']['output'];
  thumbnailPresignedUrls: Array<ThumbnailPresignedUrlRes>;
  url: Scalars['String']['output'];
};

export type GeneratePresignedUrlsResponse = {
  data: Array<GeneratePresignedUrlResponse>;
  total: Scalars['Int']['output'];
};

export enum GetOrgChartType {
  All = 'All',
  Only = 'Only',
  WChild = 'WChild',
  WParent = 'WParent'
}

export enum GrantType {
  Department = 'Department',
  User = 'User'
}

export enum IPVersion {
  IPv4 = 'IPv4',
  IPv6 = 'IPv6'
}

export type IdentifyCardPlaceListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<IdentifyCardPlaceResponse>>;
  total: Scalars['Int']['output'];
};

export type IdentifyCardPlaceResponse = {
  title?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type IdentityOrgDeviceArgs = {
  identifierForVendor?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  versionOS?: InputMaybe<Scalars['String']['input']>;
};

export type ImportBulkCreateResponse = {
  accountHolder?: Maybe<Scalars['String']['output']>;
  accountNumber?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  bankBranch?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  hrCode?: Maybe<Scalars['String']['output']>;
  idCardIssuedOn?: Maybe<Scalars['String']['output']>;
  idCardIssuedPlace?: Maybe<Scalars['String']['output']>;
  identityCard?: Maybe<Scalars['String']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  officalWorkingOn?: Maybe<Scalars['String']['output']>;
  onboardingOn?: Maybe<Scalars['String']['output']>;
  personalEmail?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  relativePhone?: Maybe<Scalars['String']['output']>;
  socialInsuranceCode?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  taxCode?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  ward?: Maybe<Scalars['String']['output']>;
};

export type ImportEmployeeArgs = {
  accountHolder?: InputMaybe<Scalars['String']['input']>;
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  bankBranch?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  hrCode?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  idCardIssuedOn?: InputMaybe<Scalars['String']['input']>;
  idCardIssuedPlace?: InputMaybe<Scalars['String']['input']>;
  identityCard?: InputMaybe<Scalars['String']['input']>;
  lastWorkingOn?: InputMaybe<Scalars['String']['input']>;
  leaderCode?: InputMaybe<Scalars['String']['input']>;
  leaveOn?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  officalWorkingOn?: InputMaybe<Scalars['String']['input']>;
  onboardingOn?: InputMaybe<Scalars['String']['input']>;
  personalEmail?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  relativePhone?: InputMaybe<Scalars['String']['input']>;
  resignationDetailReason?: InputMaybe<Scalars['String']['input']>;
  resignationReason?: InputMaybe<Scalars['String']['input']>;
  resignationType?: InputMaybe<Scalars['String']['input']>;
  resigned?: InputMaybe<Scalars['String']['input']>;
  socialInsuranceCode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  ward?: InputMaybe<Scalars['String']['input']>;
};

export type ImportEmployeeResponse = {
  accountHolder?: Maybe<Scalars['String']['output']>;
  accountNumber?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  bankBranch?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['JSON']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  hrCode?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  idCardIssuedOn?: Maybe<Scalars['String']['output']>;
  idCardIssuedPlace?: Maybe<Scalars['String']['output']>;
  identityCard?: Maybe<Scalars['String']['output']>;
  lastWorkingOn?: Maybe<Scalars['String']['output']>;
  leaveOn?: Maybe<Scalars['String']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  officalWorkingOn?: Maybe<Scalars['String']['output']>;
  onboardingOn?: Maybe<Scalars['String']['output']>;
  personalEmail?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  relativePhone?: Maybe<Scalars['String']['output']>;
  resignationDetailReason?: Maybe<Scalars['String']['output']>;
  resignationReason?: Maybe<Scalars['String']['output']>;
  resignationType?: Maybe<Scalars['String']['output']>;
  resigned?: Maybe<Scalars['String']['output']>;
  socialInsuranceCode?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  taxCode?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  ward?: Maybe<Scalars['String']['output']>;
};

export type ImportUserFieldsGetResponse = {
  fields?: Maybe<Array<Scalars['String']['output']>>;
};

export type InfoBlock = {
  appFields?: Maybe<Array<InfoField>>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  fields?: Maybe<Array<InfoField>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  officeUserExtraData?: Maybe<Scalars['JSON']['output']>;
  order: Scalars['Float']['output'];
  status: ObjectStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type InfoBlockArgs = {
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type InfoBlockResponse = PagingData & {
  blocks?: Maybe<Array<InfoBlock>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type InfoField = {
  block?: Maybe<InfoBlock>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  dataType: DataType;
  fieldType?: Maybe<BlockFieldType>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  officeUserExtraData?: Maybe<Scalars['JSON']['output']>;
  optionItems?: Maybe<Array<Scalars['String']['output']>>;
  order: Scalars['Float']['output'];
  required: Scalars['Boolean']['output'];
  status: ObjectStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['JSON']['output']>;
};

export type InfoFieldArgs = {
  blockId: Scalars['String']['input'];
  dataType?: InputMaybe<DataType>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  optionItems?: InputMaybe<Array<Scalars['String']['input']>>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type InfoFieldResponse = PagingData & {
  count: Scalars['Int']['output'];
  fields?: Maybe<Array<InfoField>>;
  total: Scalars['Int']['output'];
};

export type InitCallArgs = {
  receivers: Array<CallReceiverArgs>;
  recording?: Scalars['Boolean']['input'];
  type?: CallType;
};

export type LastKeyChatMessage = {
  conversationId: Scalars['String']['input'];
  createdAt: Scalars['Float']['input'];
};

export type LastKeyChatMessageListResponse = {
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
};

export type LearnAddress = {
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  status?: Maybe<ActiveStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type LearnCertification = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  status?: Maybe<ActiveStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type LearnCourse = {
  closeClassAt?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  enrollEndAt?: Maybe<Scalars['Float']['output']>;
  enrollStartAt?: Maybe<Scalars['Float']['output']>;
  estimateDeadline?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  joinType?: Maybe<CourseJoinTypeEnum>;
  name?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  pickedDays?: Maybe<Array<DayOfWeek>>;
  project?: Maybe<LearnProject>;
  projectId?: Maybe<Scalars['String']['output']>;
  proposer?: Maybe<OfficeUser>;
  proposerId?: Maybe<Scalars['String']['output']>;
  proposerType?: Maybe<CourseProposerTypeEnum>;
  sections?: Maybe<Array<LearnSection>>;
  startClassAt?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<CourseStatusEnum>;
  students?: Maybe<Array<LearnStudent>>;
  teacher?: Maybe<OfficeUser>;
  teacherType?: Maybe<CourseProposerTypeEnum>;
  timeCloseAt?: Maybe<Scalars['Float']['output']>;
  timeStartAt?: Maybe<Scalars['Float']['output']>;
  totalStudent?: Maybe<Scalars['Int']['output']>;
  totalTimeTraining?: Maybe<Scalars['Float']['output']>;
  trainingAddressIds?: Maybe<Array<Scalars['String']['output']>>;
  trainingAddresses?: Maybe<Array<LearnAddress>>;
  trainingTypes?: Maybe<Array<CourseTrainTypeEnum>>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type LearnLesson = {
  attachments?: Maybe<Array<File>>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  embedUrls?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  mediaType?: Maybe<LessonMediaTypeEnum>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ActiveStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type LearnProject = {
  avatars?: Maybe<Array<File>>;
  certificates?: Maybe<Array<LearnCertification>>;
  code?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  courses?: Maybe<Array<LearnCourse>>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  dayOfEvent?: Maybe<Scalars['Int']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  departments?: Maybe<Array<OfficeOrgChart>>;
  endDate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  isHide?: Maybe<Scalars['Boolean']['output']>;
  isPin: Scalars['Boolean']['output'];
  maxNumberOfStudent?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  requiredCertificateIds?: Maybe<Array<Scalars['String']['output']>>;
  requiredLearnExaminationIds?: Maybe<Array<Scalars['String']['output']>>;
  requiredLearnProjectIds?: Maybe<Array<Scalars['String']['output']>>;
  requiredSurveyIds?: Maybe<Array<Scalars['String']['output']>>;
  scoreToPass?: Maybe<Scalars['Float']['output']>;
  skills?: Maybe<Array<LearnSkill>>;
  startDate?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<LearnProjectStatusEnum>;
  summary?: Maybe<Scalars['String']['output']>;
  timeToPass?: Maybe<Scalars['Float']['output']>;
  timeType?: Maybe<ProjectTimeTypeEnum>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  videos?: Maybe<Array<File>>;
};

export enum LearnProjectStatusEnum {
  ACTIVE = 'ACTIVE',
  CLOSE = 'CLOSE',
  DRAFT = 'DRAFT'
}

export type LearnSection = {
  code?: Maybe<Scalars['String']['output']>;
  courseId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lessons?: Maybe<Array<LearnLesson>>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ActiveStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type LearnSkill = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  parent?: Maybe<LearnSkill>;
  parentId: Scalars['String']['output'];
  status?: Maybe<ActiveStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type LearnStudent = {
  course?: Maybe<LearnCourse>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  joinedAt?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  user?: Maybe<OfficeUser>;
};

export type LearningAddressCreateInput = {
  name: Scalars['String']['input'];
};

export type LearningAddressResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<LearnAddress>>;
  total: Scalars['Int']['output'];
};

export type LearningAddressUpdateInput = {
  addressId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type LearningAddressUpsertInput = {
  addressId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type LearningCertificateCreateInput = {
  name: Scalars['String']['input'];
};

export type LearningCertificateFilterInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LearningCertificateResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<LearnCertification>>;
  total: Scalars['Int']['output'];
};

export type LearningCertificateUpdateInput = {
  certificateId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type LearningCertificateUpsertInput = {
  certificateId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type LearningCourseCreateInput = {
  /** Ngày kết thúc khóa học */
  closeClassAt?: InputMaybe<Scalars['Float']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  /** Ngày kết thúc đăng ký */
  enrollEndAt?: InputMaybe<Scalars['Float']['input']>;
  /** Ngày bắt đầu đăng ký */
  enrollStartAt?: InputMaybe<Scalars['Float']['input']>;
  /** Thời hạn hoàn thành lớp học */
  estimateDeadline?: InputMaybe<Scalars['Int']['input']>;
  joinType?: InputMaybe<CourseJoinTypeEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** Lịch học */
  pickedDays?: InputMaybe<Array<DayOfWeek>>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  proposerId?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<Array<LearningSectionUpsertInput>>;
  /** Ngày bắt đầu khóa học */
  startClassAt?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<CourseStatusEnum>;
  studentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  teacherId?: InputMaybe<Scalars['String']['input']>;
  teacherType?: InputMaybe<CourseProposerTypeEnum>;
  /** Thời gian lớp đóng */
  timeCloseAt?: InputMaybe<Scalars['String']['input']>;
  /** Thời gian lớp mở */
  timeStartAt?: InputMaybe<Scalars['String']['input']>;
  totalStudent?: InputMaybe<Scalars['Int']['input']>;
  /** Số giờ đào tạo */
  totalTimeTraining?: InputMaybe<Scalars['Float']['input']>;
  trainingAddressIds?: InputMaybe<Array<Scalars['String']['input']>>;
  trainingTypes?: InputMaybe<Array<CourseTrainTypeEnum>>;
};

export type LearningCourseFilterInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LearningCourseReOrderSectionInput = {
  id: Scalars['String']['input'];
  sectionIds: Scalars['String']['input'];
};

export type LearningCourseResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<LearnCourse>>;
  total: Scalars['Int']['output'];
};

export type LearningCourseUpdateInput = {
  /** Ngày kết thúc khóa học */
  closeClassAt?: InputMaybe<Scalars['Float']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  /** Ngày kết thúc đăng ký */
  enrollEndAt?: InputMaybe<Scalars['Float']['input']>;
  /** Ngày bắt đầu đăng ký */
  enrollStartAt?: InputMaybe<Scalars['Float']['input']>;
  /** Thời hạn hoàn thành lớp học */
  estimateDeadline?: InputMaybe<Scalars['Int']['input']>;
  joinType?: InputMaybe<CourseJoinTypeEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** Lịch học */
  pickedDays?: InputMaybe<Array<DayOfWeek>>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  proposerId?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<Array<LearningSectionUpsertInput>>;
  /** Ngày bắt đầu khóa học */
  startClassAt?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<CourseStatusEnum>;
  studentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  teacherId?: InputMaybe<Scalars['String']['input']>;
  teacherType?: InputMaybe<CourseProposerTypeEnum>;
  /** Thời gian lớp đóng */
  timeCloseAt?: InputMaybe<Scalars['String']['input']>;
  /** Thời gian lớp mở */
  timeStartAt?: InputMaybe<Scalars['String']['input']>;
  totalStudent?: InputMaybe<Scalars['Int']['input']>;
  /** Số giờ đào tạo */
  totalTimeTraining?: InputMaybe<Scalars['Float']['input']>;
  trainingAddressIds?: InputMaybe<Array<Scalars['String']['input']>>;
  trainingTypes?: InputMaybe<Array<CourseTrainTypeEnum>>;
};

export type LearningCourseUpsertInput = {
  /** Ngày kết thúc khóa học */
  closeClassAt?: InputMaybe<Scalars['Float']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  /** Ngày kết thúc đăng ký */
  enrollEndAt?: InputMaybe<Scalars['Float']['input']>;
  /** Ngày bắt đầu đăng ký */
  enrollStartAt?: InputMaybe<Scalars['Float']['input']>;
  /** Thời hạn hoàn thành lớp học */
  estimateDeadline?: InputMaybe<Scalars['Int']['input']>;
  joinType?: InputMaybe<CourseJoinTypeEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** Lịch học */
  pickedDays?: InputMaybe<Array<DayOfWeek>>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  proposerId?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<Array<LearningSectionUpsertInput>>;
  /** Ngày bắt đầu khóa học */
  startClassAt?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<CourseStatusEnum>;
  studentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  teacherId?: InputMaybe<Scalars['String']['input']>;
  teacherType?: InputMaybe<CourseProposerTypeEnum>;
  /** Thời gian lớp đóng */
  timeCloseAt?: InputMaybe<Scalars['String']['input']>;
  /** Thời gian lớp mở */
  timeStartAt?: InputMaybe<Scalars['String']['input']>;
  totalStudent?: InputMaybe<Scalars['Int']['input']>;
  /** Số giờ đào tạo */
  totalTimeTraining?: InputMaybe<Scalars['Float']['input']>;
  trainingAddressIds?: InputMaybe<Array<Scalars['String']['input']>>;
  trainingTypes?: InputMaybe<Array<CourseTrainTypeEnum>>;
};

export type LearningLessonCreateInput = {
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  embedUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  mediaType?: InputMaybe<LessonMediaTypeEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  sectionId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ActiveStatus>;
};

export type LearningLessonFilterInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LearningLessonResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<LearnLesson>>;
  total: Scalars['Int']['output'];
};

export type LearningLessonUpdateInput = {
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  embedUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  lessonId?: InputMaybe<Scalars['String']['input']>;
  mediaType?: InputMaybe<LessonMediaTypeEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  sectionId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ActiveStatus>;
};

export type LearningLessonUpsertInput = {
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  embedUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  lessonId?: InputMaybe<Scalars['String']['input']>;
  mediaType?: InputMaybe<LessonMediaTypeEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  sectionId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ActiveStatus>;
};

export type LearningProjectCreateInput = {
  avatarIds?: InputMaybe<Array<Scalars['String']['input']>>;
  certificateIds?: InputMaybe<Array<Scalars['String']['input']>>;
  code?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  dayOfEvent?: InputMaybe<Scalars['Int']['input']>;
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  endDate?: InputMaybe<Scalars['Float']['input']>;
  isHide?: InputMaybe<Scalars['Boolean']['input']>;
  maxNumberOfStudent?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  requiredCertificateIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredLearnExaminationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredLearnProjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredSurveyIds?: InputMaybe<Array<Scalars['String']['input']>>;
  scoreToPass?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<LearnProjectStatusEnum>;
  summary?: InputMaybe<Scalars['String']['input']>;
  timeToPass?: InputMaybe<Scalars['Float']['input']>;
  timeType?: InputMaybe<ProjectTimeTypeEnum>;
  videoIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LearningProjectFilterInput = {
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  endDate?: InputMaybe<Scalars['Float']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<OrderListProjectArgs>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<LearnProjectStatusEnum>;
};

export type LearningProjectResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<LearnProject>>;
  total: Scalars['Int']['output'];
};

export type LearningProjectUpdateInput = {
  avatarIds?: InputMaybe<Array<Scalars['String']['input']>>;
  certificateIds?: InputMaybe<Array<Scalars['String']['input']>>;
  code?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  dayOfEvent?: InputMaybe<Scalars['Int']['input']>;
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  endDate?: InputMaybe<Scalars['Float']['input']>;
  isHide?: InputMaybe<Scalars['Boolean']['input']>;
  isPin?: InputMaybe<Scalars['Boolean']['input']>;
  maxNumberOfStudent?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  requiredCertificateIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredLearnExaminationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredLearnProjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredSurveyIds?: InputMaybe<Array<Scalars['String']['input']>>;
  scoreToPass?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<LearnProjectStatusEnum>;
  summary?: InputMaybe<Scalars['String']['input']>;
  timeToPass?: InputMaybe<Scalars['Float']['input']>;
  timeType?: InputMaybe<ProjectTimeTypeEnum>;
  videoIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LearningProjectUpsertInput = {
  avatarIds?: InputMaybe<Array<Scalars['String']['input']>>;
  certificateIds?: InputMaybe<Array<Scalars['String']['input']>>;
  code?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  dayOfEvent?: InputMaybe<Scalars['Int']['input']>;
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  endDate?: InputMaybe<Scalars['Float']['input']>;
  isHide?: InputMaybe<Scalars['Boolean']['input']>;
  isPin?: InputMaybe<Scalars['Boolean']['input']>;
  maxNumberOfStudent?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  requiredCertificateIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredLearnExaminationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredLearnProjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
  requiredSurveyIds?: InputMaybe<Array<Scalars['String']['input']>>;
  scoreToPass?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<LearnProjectStatusEnum>;
  summary?: InputMaybe<Scalars['String']['input']>;
  timeToPass?: InputMaybe<Scalars['Float']['input']>;
  timeType?: InputMaybe<ProjectTimeTypeEnum>;
  videoIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LearningSectionCreateInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  lessons?: InputMaybe<Array<LearningLessonUpsertInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type LearningSectionFilterInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LearningSectionReOrderLessonInput = {
  lessonIds: Scalars['String']['input'];
  sectionId: Scalars['String']['input'];
};

export type LearningSectionResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<LearnSection>>;
  total: Scalars['Int']['output'];
};

export type LearningSectionUpdateInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  lessons?: InputMaybe<Array<LearningLessonUpsertInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  sectionId?: InputMaybe<Scalars['String']['input']>;
};

export type LearningSectionUpsertInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  lessons?: InputMaybe<Array<LearningLessonUpsertInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  sectionId?: InputMaybe<Scalars['String']['input']>;
};

export type LearningSkillCreateInput = {
  name: Scalars['String']['input'];
};

export type LearningSkillFilterInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LearningSkillResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<LearnSkill>>;
  total: Scalars['Int']['output'];
};

export type LearningSkillUpdateInput = {
  name: Scalars['String']['input'];
  skillId?: InputMaybe<Scalars['String']['input']>;
};

export type LearningSkillUpsertInput = {
  name: Scalars['String']['input'];
  skillId?: InputMaybe<Scalars['String']['input']>;
};

export enum LessonMediaTypeEnum {
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO'
}

export type LocationArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type LocationResponse = {
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export enum LogAction {
  Create = 'Create',
  Update = 'Update'
}

export type LogData = {
  action?: Maybe<TaskAction>;
  actionAt?: Maybe<Scalars['Float']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  newValue?: Maybe<Scalars['JSON']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  oldValue?: Maybe<Scalars['JSON']['output']>;
  taskType?: Maybe<TaskTypeEnum>;
};

export enum LogisticsForMettingRoom {
  Candy = 'Candy',
  Flower = 'Flower',
  Water = 'Water'
}

export type ManageWikiFilter = {
  folderIds?: InputMaybe<Array<Scalars['String']['input']>>;
  importants?: InputMaybe<Array<WikiImportant>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  ordinal?: InputMaybe<OrdinalCase>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ManagementAssetFilter = {
  /** Phòng ban */
  assignedDepartmentId?: InputMaybe<Scalars['String']['input']>;
  /** danh muc tai san */
  categoryId?: InputMaybe<Scalars['String']['input']>;
  handoverDate?: InputMaybe<DatePeriod>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  /** Phòng ban */
  managementDepartmentId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  priceRange?: InputMaybe<NumberRange>;
  purchaseDate?: InputMaybe<DatePeriod>;
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<AssetStatus>;
  warrantyByMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type ManagementCategoryAssetFilter = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ManagementWarehouseAssetFilter = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ManagementWorkProfileFilter = {
  activeDate?: InputMaybe<DatePeriod>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  orgId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type MeetingDetailResponse = {
  meeting?: Maybe<MeetingRoomSchedule>;
};

export type MeetingRoom = {
  approvalForm?: Maybe<ApprovalForm>;
  approvalFormId?: Maybe<Scalars['String']['output']>;
  capacity?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  status?: Maybe<ObjectStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type MeetingRoomSchedule = {
  booking?: Maybe<BookingMeetingRoom>;
  cancelDescription?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  endAt?: Maybe<Scalars['Float']['output']>;
  equiments?: Maybe<Array<EquimentsForMettingRoom>>;
  host?: Maybe<OfficeUser>;
  id: Scalars['String']['output'];
  logistics?: Maybe<Array<LogisticsForMettingRoom>>;
  meetingContent?: Maybe<Scalars['String']['output']>;
  meetingRoom?: Maybe<MeetingRoom>;
  note?: Maybe<Scalars['String']['output']>;
  notify?: Maybe<NotificationCampaign>;
  participants?: Maybe<Array<OfficeUser>>;
  quantity?: Maybe<Scalars['Int']['output']>;
  startAt?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type MeetingRoomsResponse = PagingData & {
  count: Scalars['Int']['output'];
  meetingRooms?: Maybe<Array<MeetingRoom>>;
  total: Scalars['Int']['output'];
};

export type MeetingsResponse = {
  meetings?: Maybe<Array<MeetingRoomSchedule>>;
  total: Scalars['Int']['output'];
};

export type Mutation = {
  appNotificationGetDetail: Notification;
  appNotificationRemove: Notification;
  appNotificationUpdate: Notification;
  appNotificationUpdateAll: AppNotificationResponse;
  approveNewDevices?: Maybe<OrganizationDevice>;
  chatConversationDelete?: Maybe<OfficeChatConversationMember>;
  chatConversationLeave?: Maybe<OfficeChatConversation>;
  chatGroupAdd?: Maybe<OfficeChatConversation>;
  chatGroupEdit?: Maybe<OfficeChatConversation>;
  chatMessageAdd?: Maybe<OfficeChatMessage>;
  chatMessageDeleteHistory?: Maybe<OfficeChatConversationMember>;
  chatMessageEdit?: Maybe<OfficeChatMessage>;
  chatMessageUpdateReaction?: Maybe<OfficeChatMessage>;
  chatMessageUpdateRead?: Maybe<ChatMessageUpdateReadResponse>;
  chatNotifyUser?: Maybe<Scalars['Boolean']['output']>;
  chatReactionFrequentlyUsed?: Maybe<Array<Scalars['String']['output']>>;
  checkInAddPlace: CheckInPlace;
  checkInBeacon: CheckInDetail;
  checkInEditBeacon: CheckInBeacon;
  checkInEditPlace: CheckInPlace;
  checkInRemoveBeacon: CheckInBeacon;
  checkInRemovePlace: CheckInPlace;
  checkInSyncBeacon: Array<CheckInBeacon>;
  documentAddFolder: DocumentFolder;
  documentCopyFile: DocumentFile;
  documentDeleteFile: DocumentFile;
  documentDeleteFolder: DocumentFolder;
  documentEditFolder: DocumentFolder;
  documentGenLinkUpload: ObjectGenLinkWriteResponse;
  documentMoveFile: DocumentFile;
  documentRenameFile: DocumentFile;
  documentUploadFile: DocumentFile;
  documentUploadFileSuccess: DocumentFile;
  iamNotificationSubscribe: NotificationSubscribeResponse;
  identityChangePassword: UserResponse;
  identityLogout?: Maybe<User>;
  identityOfficeLogin: UserResponse;
  identityOfficePhoneChallenge?: Maybe<OtpResponse>;
  identityRefreshToken?: Maybe<UserResponse>;
  identitySetPassword?: Maybe<UserResponse>;
  identitySysLogin: UserResponse;
  identityVerifyForgotPassword?: Maybe<UserResponse>;
  manageAdminLinkWithUser?: Maybe<OfficeSysUser>;
  manageAdminUnlinkUser?: Maybe<OfficeSysUser>;
  manageDocumentTagCreate?: Maybe<TagDocument>;
  manageDocumentTagRemove?: Maybe<Scalars['String']['output']>;
  manageDocumentTagUpdate?: Maybe<TagDocument>;
  manageDocumentTagUpsert?: Maybe<TagDocument>;
  manageLearningAddressCreate?: Maybe<LearnAddress>;
  manageLearningAddressRemove?: Maybe<Scalars['String']['output']>;
  manageLearningAddressUpdate?: Maybe<LearnAddress>;
  manageLearningAddressUpsert?: Maybe<LearnAddress>;
  manageLearningCertificateCreate?: Maybe<LearnCertification>;
  manageLearningCertificateRemove?: Maybe<Scalars['String']['output']>;
  manageLearningCertificateUpdate?: Maybe<LearnCertification>;
  manageLearningCertificateUpsert?: Maybe<LearnCertification>;
  manageLearningCourseCreate?: Maybe<LearnCourse>;
  manageLearningCourseReOrderSection?: Maybe<LearnCourse>;
  manageLearningCourseRemove?: Maybe<Scalars['String']['output']>;
  manageLearningCourseUpdate?: Maybe<LearnCourse>;
  manageLearningCourseUpsert?: Maybe<LearnCourse>;
  manageLearningLessonCreate?: Maybe<LearnLesson>;
  manageLearningLessonRemove?: Maybe<Scalars['String']['output']>;
  manageLearningLessonUpdate?: Maybe<LearnLesson>;
  manageLearningLessonUpsert?: Maybe<LearnLesson>;
  manageLearningProjectCreate?: Maybe<LearnProject>;
  manageLearningProjectRemove?: Maybe<Scalars['String']['output']>;
  manageLearningProjectUpdate?: Maybe<LearnProject>;
  manageLearningProjectUpsert?: Maybe<LearnProject>;
  manageLearningSectionCreate?: Maybe<LearnSection>;
  manageLearningSectionReOrderLesson?: Maybe<LearnSection>;
  manageLearningSectionRemove?: Maybe<Scalars['String']['output']>;
  manageLearningSectionUpdate?: Maybe<LearnSection>;
  manageLearningSectionUpsert?: Maybe<LearnSection>;
  manageLearningSkillCreate?: Maybe<LearnSkill>;
  manageLearningSkillRemove?: Maybe<Scalars['String']['output']>;
  manageLearningSkillUpdate?: Maybe<LearnSkill>;
  manageLearningSkillUpsert?: Maybe<LearnSkill>;
  manageVerifyOxiiPhoneNumber: VerifyOxiiPhoneNumberRes;
  manageVersionWikiComment?: Maybe<VersionWiki>;
  manageVersionWikiRecall?: Maybe<VersionWiki>;
  manageWikiCategoryCreate?: Maybe<CategoryWiki>;
  manageWikiCategoryRemove?: Maybe<Scalars['String']['output']>;
  manageWikiCategoryUpdate?: Maybe<CategoryWiki>;
  manageWikiCategoryUpsert?: Maybe<CategoryWiki>;
  manageWikiComment?: Maybe<VersionWiki>;
  manageWikiCopy?: Maybe<Array<DocumentWiki>>;
  manageWikiCreate?: Maybe<DocumentWiki>;
  manageWikiInfoUpdate?: Maybe<DocumentWiki>;
  manageWikiMove?: Maybe<DocumentWiki>;
  manageWikiNewVersionCreate?: Maybe<DocumentWiki>;
  manageWikiNewVersionRevert?: Maybe<DocumentWiki>;
  manageWikiOnOff?: Maybe<DocumentWiki>;
  manageWikiRemove?: Maybe<Scalars['String']['output']>;
  manageWikiSetImportant?: Maybe<DocumentWiki>;
  manageWikiUpdate?: Maybe<DocumentWiki>;
  managementAddEmployee?: Maybe<OfficeUser>;
  managementAddOrgChart: OfficeOrgChart;
  managementAssetBulkUpsert?: Maybe<AssetBulkUpsertResponse>;
  managementBookingScheduleNotify: NotificationCampaign;
  managementBookingScheduleRemove: Scalars['String']['output'];
  managementBookingScheduleUpdate: MeetingRoomSchedule;
  managementCarBookingScheduleRemove: Scalars['String']['output'];
  managementCarBookingScheduleUpdate: CarBookingSchedule;
  managementDeleteBookingMeetingRoom: Scalars['String']['output'];
  managementEditEmployee: OfficeUser;
  managementEditOrgChart: OfficeOrgChart;
  managementEmployeeBulkCreate?: Maybe<EmployeeBulkCreateResponse>;
  managementEmployeeBulkUpsert?: Maybe<BulkImportEmployeeResponse>;
  managementEmployeeDataBulkUpsert?: Maybe<BulkUpsertEmployeeDataResponse>;
  managementOrgChartBulkUpsert?: Maybe<BulkUpsertOrgChartResponse>;
  managementOrgChartOnOff: OfficeOrgChart;
  managementPayrollBlockBulkUpsert?: Maybe<PayrollBlockBulkUpsertResponse>;
  managementPayrollBlockCreate?: Maybe<InfoBlock>;
  managementPayrollBlockDelete?: Maybe<Scalars['String']['output']>;
  managementPayrollBlockFieldCreate?: Maybe<InfoField>;
  managementPayrollBlockFieldUpdate?: Maybe<InfoField>;
  managementPayrollBlockUpdate?: Maybe<InfoBlock>;
  managementPayrollBulkUpsert?: Maybe<PayrollBulkUpsertResponse>;
  managementPayrollCreate?: Maybe<OfficePayroll>;
  managementPayrollUpdate?: Maybe<OfficePayroll>;
  managementRemoveOrgChart: OfficeOrgChart;
  managementUpdateNotifyBookingMeetingRoom: NotificationCampaign;
  managementUserPaycheckBulkUpsert?: Maybe<UserPaycheckBulkUpsertResponse>;
  managementUserPaycheckCreate?: Maybe<OfficeUserPaycheck>;
  managementUserPaycheckUpdate?: Maybe<OfficeUserPaycheck>;
  managementWorkProfileBulkUpsert?: Maybe<WorkProfileBulkUpsertResponse>;
  managementWorkProfileCreate?: Maybe<UserWorkProfile>;
  managementWorkProfileUpdate?: Maybe<UserWorkProfile>;
  managerApprovalFormGroupCreate?: Maybe<ApprovalFormGroup>;
  managerApprovalFormGroupRemove?: Maybe<Scalars['String']['output']>;
  managerApprovalFormGroupUpdate?: Maybe<ApprovalFormGroup>;
  managerApprovalOnOff: ApprovalForm;
  managerAssetCreate?: Maybe<Array<Asset>>;
  managerAssetRemove?: Maybe<Scalars['String']['output']>;
  managerAssetUpdate?: Maybe<Asset>;
  officeAddCar: Car;
  officeAddTitle: OfficeTitle;
  officeApprovalAddForm: ApprovalForm;
  officeApprovalApproveStepUpdate: OfficeApproval;
  officeApprovalCommentCreate?: Maybe<OfficeApproval>;
  officeApprovalEditForm: ApprovalForm;
  officeApprovalFilterCreate: OfficeFilter;
  officeApprovalFilterRemove: OfficeFilter;
  officeApprovalFilterUpdate: OfficeFilter;
  officeApprovalRemove: OfficeApproval;
  officeApprovalSubscriberUpdate: OfficeApproval;
  officeApprovalUpdate: OfficeApproval;
  officeBookCar: BookingCarResponse;
  officeBookMeetingRoom: BookMeetingRoomsResponse;
  officeBookMeetingRoomLegacy: BookMeetingRoomsResponse;
  officeBookingMeetingRoomRemove: Scalars['String']['output'];
  officeBookingMeetingRoomScheduleRemove: Scalars['String']['output'];
  officeBookingScheduleNotify: NotificationCampaign;
  officeBookingScheduleUpdate: MeetingRoomSchedule;
  officeBusinessRoleCreate: BusinessRole;
  officeBusinessRoleUpdate: BusinessRole;
  officeCallAccept: CallRecord;
  officeCallCancel: CallRecord;
  officeCallEnd: CallRecord;
  officeCallRefuse: CallRecord;
  officeCarBookingRequest: CarBookingRequest;
  officeCarBookingScheduleRemove: Scalars['String']['output'];
  officeCarBookingScheduleUpdate: CarBookingSchedule;
  officeCreateMeetingRoom: MeetingRoom;
  officeCreateNotificationCampaign: NotificationCampaign;
  officeDeleteMeetingRoom?: Maybe<MeetingRoom>;
  officeEditCar: Car;
  officeEditTitle: OfficeTitle;
  officeEmployeeAvatarUpdate: File;
  officeInitCall: CallRecord;
  officeLearningCourseCreate?: Maybe<LearnCourse>;
  officeLearningCourseReOrderSection?: Maybe<LearnCourse>;
  officeLearningCourseRemove?: Maybe<Scalars['String']['output']>;
  officeLearningCourseUpdate?: Maybe<LearnCourse>;
  officeLearningCourseUpsert?: Maybe<LearnCourse>;
  officeLearningLessonCreate?: Maybe<LearnLesson>;
  officeLearningLessonRemove?: Maybe<Scalars['String']['output']>;
  officeLearningLessonUpdate?: Maybe<LearnLesson>;
  officeLearningLessonUpsert?: Maybe<LearnLesson>;
  officeLearningSectionCreate?: Maybe<LearnSection>;
  officeLearningSectionReOrderLesson?: Maybe<LearnSection>;
  officeLearningSectionRemove?: Maybe<Scalars['String']['output']>;
  officeLearningSectionUpdate?: Maybe<LearnSection>;
  officeLearningSectionUpsert?: Maybe<LearnSection>;
  officeObjectStoreGenLinkUpload: OfficeObjectStoreGenLinkUpload;
  officeObjectStoreUploadSuccess: OfficeObject;
  officeRemoveCar: Car;
  officeRemoveTitle: OfficeTitle;
  officeRequestApproval: OfficeApproval;
  officeShoppingRequest: OfficeShoppingRequest;
  officeSysUserCreate?: Maybe<OfficeSysUser>;
  officeSysUserUpdate?: Maybe<OfficeSysUser>;
  officeTaskCommentCreate?: Maybe<OfficeTaskLog>;
  officeTaskCommentUpdate?: Maybe<OfficeTaskLog>;
  officeTaskCreate?: Maybe<OfficeTask>;
  officeTaskFilterCreate: OfficeFilter;
  officeTaskFilterRemove: OfficeFilter;
  officeTaskFilterUpdate: OfficeFilter;
  officeTaskStatusUpdate?: Maybe<OfficeTask>;
  officeTaskUpdate?: Maybe<OfficeTask>;
  officeTitleBulkUpsert?: Maybe<BulkUpsertTitleResponse>;
  officeUpdateApprovalAction: ApprovalStep;
  officeUpdateBookingByAdmin: BookingCarResponse;
  officeUpdateBookingByLeader: BookingCarResponse;
  officeUpdateBookingMeetingRoom: BookMeetingRoomsResponse;
  officeUpdateMeetingRoom: MeetingRoom;
  officeUpdateNotificationCampaign: NotificationCampaign;
  officeVersionWikiComment?: Maybe<VersionWiki>;
  officeWikiComment?: Maybe<VersionWiki>;
  profileAddBlock: InfoBlock;
  profileAddField: InfoField;
  profileBlockBulkUpsert?: Maybe<BulkUpsertBlockResponse>;
  profileEditBlock: InfoBlock;
  profileEditField: InfoField;
  profileFieldBulkUpsert?: Maybe<BulkUpsertFieldResponse>;
  profileRemoveBlockField: Scalars['String']['output'];
  registerOrganizationDevice?: Maybe<OrganizationDevice>;
  storageActiveUsingFiles: FileResponse;
  storageDeleteFile: File;
  storageGeneratePresignedUrls: GeneratePresignedUrlsResponse;
  storageUploadFile: File;
  userCheckIn: CheckInDetail;
  userPaycheckCommentCreate?: Maybe<OfficeUserPaycheck>;
  whitelistAddIP: WhitelistAddIpResponse;
  whitelistRemoveIP: WhitelistRemoveIpResponse;
};


export type MutationAppNotificationGetDetailArgs = {
  id: Scalars['String']['input'];
};


export type MutationAppNotificationRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationAppNotificationUpdateArgs = {
  arguments: AppNotificationUpdateArgs;
};


export type MutationAppNotificationUpdateAllArgs = {
  arguments: AppNotificationUpdateAllArgs;
};


export type MutationApproveNewDevicesArgs = {
  id: Scalars['String']['input'];
};


export type MutationChatConversationDeleteArgs = {
  arguments: ChatGroupLeaveArgs;
};


export type MutationChatConversationLeaveArgs = {
  arguments: ChatGroupLeaveArgs;
};


export type MutationChatGroupAddArgs = {
  arguments: ChatGroupAddInput;
};


export type MutationChatGroupEditArgs = {
  arguments: ChatGroupEditInput;
};


export type MutationChatMessageAddArgs = {
  arguments: ChatAddMessageInput;
};


export type MutationChatMessageDeleteHistoryArgs = {
  arguments: DeleteHistoryArgs;
};


export type MutationChatMessageEditArgs = {
  arguments: ChatMessageUpdateArgs;
};


export type MutationChatMessageUpdateReactionArgs = {
  arguments: ChatMessageUpdateReactionArgs;
};


export type MutationChatMessageUpdateReadArgs = {
  arguments: ChatMessageUpdateReadArgs;
};


export type MutationChatNotifyUserArgs = {
  arguments?: InputMaybe<ChatNotifyUserData>;
};


export type MutationCheckInAddPlaceArgs = {
  arguments: CheckInPlaceArgs;
};


export type MutationCheckInBeaconArgs = {
  arguments: CheckInBeaconArgs;
};


export type MutationCheckInEditBeaconArgs = {
  arguments: EditCheckInBeaconArgs;
};


export type MutationCheckInEditPlaceArgs = {
  arguments: EditCheckInPlaceArgs;
};


export type MutationCheckInRemoveBeaconArgs = {
  id: Scalars['String']['input'];
};


export type MutationCheckInRemovePlaceArgs = {
  id: Scalars['String']['input'];
};


export type MutationCheckInSyncBeaconArgs = {
  otp: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type MutationDocumentAddFolderArgs = {
  arguments: DocumentFolderArgs;
};


export type MutationDocumentCopyFileArgs = {
  fileId: Scalars['String']['input'];
  folderId?: Scalars['String']['input'];
  override?: Scalars['Boolean']['input'];
};


export type MutationDocumentDeleteFileArgs = {
  fileId: Scalars['String']['input'];
};


export type MutationDocumentDeleteFolderArgs = {
  folderId: Scalars['String']['input'];
};


export type MutationDocumentEditFolderArgs = {
  arguments: EditDocumentFolderArgs;
};


export type MutationDocumentGenLinkUploadArgs = {
  filename: Scalars['String']['input'];
  folderId?: Scalars['String']['input'];
  mimetype?: InputMaybe<Scalars['String']['input']>;
  override?: Scalars['Boolean']['input'];
};


export type MutationDocumentMoveFileArgs = {
  fileId: Scalars['String']['input'];
  folderId?: Scalars['String']['input'];
  override?: Scalars['Boolean']['input'];
};


export type MutationDocumentRenameFileArgs = {
  fileId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  override?: Scalars['Boolean']['input'];
};


export type MutationDocumentUploadFileArgs = {
  file: Scalars['Upload']['input'];
  folderId?: Scalars['String']['input'];
  override?: Scalars['Boolean']['input'];
};


export type MutationDocumentUploadFileSuccessArgs = {
  encoding: Scalars['String']['input'];
  filename: Scalars['String']['input'];
  folderId?: Scalars['String']['input'];
  mimetype: Scalars['String']['input'];
  path: Scalars['String']['input'];
};


export type MutationIamNotificationSubscribeArgs = {
  client?: InputMaybe<AccessSessionClient>;
  deviceToken: Scalars['String']['input'];
};


export type MutationIdentityChangePasswordArgs = {
  arguments: UserPasswordArgs;
};


export type MutationIdentityOfficeLoginArgs = {
  credential: UserLoginArgs;
};


export type MutationIdentityOfficePhoneChallengeArgs = {
  phone: Scalars['String']['input'];
};


export type MutationIdentityRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationIdentitySetPasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationIdentitySysLoginArgs = {
  credential: CmsUserLoginArgs;
};


export type MutationIdentityVerifyForgotPasswordArgs = {
  otp: Scalars['Float']['input'];
  session: Scalars['String']['input'];
};


export type MutationManageAdminLinkWithUserArgs = {
  credential: UserLoginArgs;
};


export type MutationManageDocumentTagCreateArgs = {
  arguments: DocumentTagCreateInput;
};


export type MutationManageDocumentTagRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageDocumentTagUpdateArgs = {
  arguments: DocumentTagUpdateInput;
};


export type MutationManageDocumentTagUpsertArgs = {
  arguments: DocumentTagUpsertInput;
};


export type MutationManageLearningAddressCreateArgs = {
  arguments: LearningAddressCreateInput;
};


export type MutationManageLearningAddressRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageLearningAddressUpdateArgs = {
  arguments: LearningAddressUpdateInput;
};


export type MutationManageLearningAddressUpsertArgs = {
  arguments: LearningAddressUpsertInput;
};


export type MutationManageLearningCertificateCreateArgs = {
  arguments: LearningCertificateCreateInput;
};


export type MutationManageLearningCertificateRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageLearningCertificateUpdateArgs = {
  arguments: LearningCertificateUpdateInput;
};


export type MutationManageLearningCertificateUpsertArgs = {
  arguments: LearningCertificateUpsertInput;
};


export type MutationManageLearningCourseCreateArgs = {
  arguments: LearningCourseCreateInput;
};


export type MutationManageLearningCourseReOrderSectionArgs = {
  arguments: LearningCourseReOrderSectionInput;
};


export type MutationManageLearningCourseRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageLearningCourseUpdateArgs = {
  arguments: LearningCourseUpdateInput;
};


export type MutationManageLearningCourseUpsertArgs = {
  arguments: LearningCourseUpsertInput;
};


export type MutationManageLearningLessonCreateArgs = {
  arguments: LearningLessonCreateInput;
};


export type MutationManageLearningLessonRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageLearningLessonUpdateArgs = {
  arguments: LearningLessonUpdateInput;
};


export type MutationManageLearningLessonUpsertArgs = {
  arguments: LearningLessonUpsertInput;
};


export type MutationManageLearningProjectCreateArgs = {
  arguments: LearningProjectCreateInput;
};


export type MutationManageLearningProjectRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageLearningProjectUpdateArgs = {
  arguments: LearningProjectUpdateInput;
};


export type MutationManageLearningProjectUpsertArgs = {
  arguments: LearningProjectUpsertInput;
};


export type MutationManageLearningSectionCreateArgs = {
  arguments: LearningSectionCreateInput;
};


export type MutationManageLearningSectionReOrderLessonArgs = {
  arguments: LearningSectionReOrderLessonInput;
};


export type MutationManageLearningSectionRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageLearningSectionUpdateArgs = {
  arguments: LearningSectionUpdateInput;
};


export type MutationManageLearningSectionUpsertArgs = {
  arguments: LearningSectionUpsertInput;
};


export type MutationManageLearningSkillCreateArgs = {
  arguments: LearningSkillCreateInput;
};


export type MutationManageLearningSkillRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageLearningSkillUpdateArgs = {
  arguments: LearningSkillUpdateInput;
};


export type MutationManageLearningSkillUpsertArgs = {
  arguments: LearningSkillUpsertInput;
};


export type MutationManageVerifyOxiiPhoneNumberArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationManageVersionWikiCommentArgs = {
  arguments: VersionWikiCommentCreateInput;
};


export type MutationManageVersionWikiRecallArgs = {
  versionWikiId: Scalars['String']['input'];
};


export type MutationManageWikiCategoryCreateArgs = {
  arguments: WikiCategoryCreateInput;
};


export type MutationManageWikiCategoryRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageWikiCategoryUpdateArgs = {
  arguments: WikiCategoryUpdateInput;
};


export type MutationManageWikiCategoryUpsertArgs = {
  arguments: WikiCategoryUpsertInput;
};


export type MutationManageWikiCommentArgs = {
  arguments: WikiCommentCreateInput;
};


export type MutationManageWikiCopyArgs = {
  arguments: WikiCopyCreateInput;
};


export type MutationManageWikiCreateArgs = {
  arguments: WikiCreateInput;
};


export type MutationManageWikiInfoUpdateArgs = {
  arguments: WikiInfoUpdateInput;
};


export type MutationManageWikiMoveArgs = {
  arguments: WikiMoveInput;
};


export type MutationManageWikiNewVersionCreateArgs = {
  arguments: WikiNewVersionCreateInput;
};


export type MutationManageWikiNewVersionRevertArgs = {
  arguments: WikiNewVersionRevertInput;
};


export type MutationManageWikiOnOffArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageWikiRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManageWikiSetImportantArgs = {
  arguments: WikiSetImportantInput;
};


export type MutationManageWikiUpdateArgs = {
  arguments: WikiUpdateInput;
};


export type MutationManagementAddEmployeeArgs = {
  arguments: AddEmployeeArgs;
};


export type MutationManagementAddOrgChartArgs = {
  arguments: OrgChartArgs;
};


export type MutationManagementAssetBulkUpsertArgs = {
  arguments: Array<AssetBulkUpsertInput>;
};


export type MutationManagementBookingScheduleNotifyArgs = {
  arguments: BookingScheduleNotifyInput;
};


export type MutationManagementBookingScheduleRemoveArgs = {
  arguments: BookingScheduleRemoveInput;
};


export type MutationManagementBookingScheduleUpdateArgs = {
  arguments: BookingScheduleUpdateInput;
};


export type MutationManagementCarBookingScheduleRemoveArgs = {
  arguments: CarBookingScheduleRemoveInput;
};


export type MutationManagementCarBookingScheduleUpdateArgs = {
  arguments: CarBookingScheduleUpdateInput;
};


export type MutationManagementDeleteBookingMeetingRoomArgs = {
  arguments: DeleteBookingMeetingRoomArgs;
};


export type MutationManagementEditEmployeeArgs = {
  arguments: EditEmployeeArgs;
};


export type MutationManagementEditOrgChartArgs = {
  arguments: EditOrgChartArgs;
};


export type MutationManagementEmployeeBulkCreateArgs = {
  officeUsers: Array<EmployeeBulkCreateImport>;
};


export type MutationManagementEmployeeBulkUpsertArgs = {
  officeUsers: Array<ImportEmployeeArgs>;
};


export type MutationManagementEmployeeDataBulkUpsertArgs = {
  employeeDatas: Array<UpsertEmployeeDataArgs>;
};


export type MutationManagementOrgChartBulkUpsertArgs = {
  orgcharts: Array<UpsertOrgChartArgs>;
};


export type MutationManagementOrgChartOnOffArgs = {
  id: Scalars['String']['input'];
};


export type MutationManagementPayrollBlockBulkUpsertArgs = {
  blocks: Array<PayrollBlockBulkUpsertInput>;
};


export type MutationManagementPayrollBlockCreateArgs = {
  arguments: PayrollBlockCreateInput;
};


export type MutationManagementPayrollBlockDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationManagementPayrollBlockFieldCreateArgs = {
  arguments: PayrollBlockFieldCreateInput;
};


export type MutationManagementPayrollBlockFieldUpdateArgs = {
  arguments: PayrollBlockFieldUpdateInput;
};


export type MutationManagementPayrollBlockUpdateArgs = {
  arguments: PayrollBlockUpdateInput;
};


export type MutationManagementPayrollBulkUpsertArgs = {
  payrolls: Array<PayrollBulkUpsertInput>;
};


export type MutationManagementPayrollCreateArgs = {
  arguments: PayrollCreateInput;
};


export type MutationManagementPayrollUpdateArgs = {
  arguments: PayrollUpdateInput;
};


export type MutationManagementRemoveOrgChartArgs = {
  id: Scalars['String']['input'];
};


export type MutationManagementUpdateNotifyBookingMeetingRoomArgs = {
  arguments: NotificationBookingMeetingRoomArgs;
};


export type MutationManagementUserPaycheckBulkUpsertArgs = {
  userPaychecks: Array<UserPaycheckBulkUpsertInput>;
};


export type MutationManagementUserPaycheckCreateArgs = {
  arguments: UserPaycheckCreateInput;
};


export type MutationManagementUserPaycheckUpdateArgs = {
  arguments: UserPaycheckUpdateInput;
};


export type MutationManagementWorkProfileBulkUpsertArgs = {
  arguments: Array<WorkProfileBulkUpsertInput>;
};


export type MutationManagementWorkProfileCreateArgs = {
  arguments: WorkProfileCreateInput;
};


export type MutationManagementWorkProfileUpdateArgs = {
  arguments: WorkProfileUpdateInput;
};


export type MutationManagerApprovalFormGroupCreateArgs = {
  arguments: ApprovalFormGroupCreateInput;
};


export type MutationManagerApprovalFormGroupRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManagerApprovalFormGroupUpdateArgs = {
  arguments: ApprovalFormGroupCreateUpdateInput;
};


export type MutationManagerApprovalOnOffArgs = {
  id: Scalars['String']['input'];
};


export type MutationManagerAssetCreateArgs = {
  arguments: AssetCreateInput;
};


export type MutationManagerAssetRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationManagerAssetUpdateArgs = {
  arguments: AssetUpdateInput;
};


export type MutationOfficeAddCarArgs = {
  arguments: OfficeCarArgs;
};


export type MutationOfficeAddTitleArgs = {
  arguments: OfficeTitleArgs;
};


export type MutationOfficeApprovalAddFormArgs = {
  arguments: ApprovalFormArgs;
};


export type MutationOfficeApprovalApproveStepUpdateArgs = {
  arguments: ApprovalApproveStepUpdateInput;
};


export type MutationOfficeApprovalCommentCreateArgs = {
  arguments: ApprovalCommentCreate;
};


export type MutationOfficeApprovalEditFormArgs = {
  arguments: EditApprovalFormArgs;
};


export type MutationOfficeApprovalFilterCreateArgs = {
  args?: InputMaybe<ApprovalFilterCreateInput>;
};


export type MutationOfficeApprovalFilterRemoveArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationOfficeApprovalFilterUpdateArgs = {
  args?: InputMaybe<ApprovalFilterUpdateInput>;
};


export type MutationOfficeApprovalRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationOfficeApprovalSubscriberUpdateArgs = {
  arguments: ApprovalSubscriberUpdateInput;
};


export type MutationOfficeApprovalUpdateArgs = {
  arguments: ApprovalUpdateInput;
};


export type MutationOfficeBookCarArgs = {
  arguments: BookCarArgs;
};


export type MutationOfficeBookMeetingRoomArgs = {
  arguments: BookMeetingRoomArgs;
};


export type MutationOfficeBookMeetingRoomLegacyArgs = {
  arguments: BookMeetingRoomArgs;
};


export type MutationOfficeBookingMeetingRoomRemoveArgs = {
  arguments: DeleteBookingMeetingRoomArgs;
};


export type MutationOfficeBookingMeetingRoomScheduleRemoveArgs = {
  arguments: BookingScheduleRemoveInput;
};


export type MutationOfficeBookingScheduleNotifyArgs = {
  arguments: BookingScheduleNotifyInput;
};


export type MutationOfficeBookingScheduleUpdateArgs = {
  arguments: BookingScheduleUpdateInput;
};


export type MutationOfficeBusinessRoleCreateArgs = {
  arguments: BusinessRoleCreateArgs;
};


export type MutationOfficeBusinessRoleUpdateArgs = {
  arguments: BusinessRoleUpdateArgs;
};


export type MutationOfficeCallAcceptArgs = {
  callId: Scalars['String']['input'];
};


export type MutationOfficeCallCancelArgs = {
  callId: Scalars['String']['input'];
};


export type MutationOfficeCallEndArgs = {
  callId: Scalars['String']['input'];
};


export type MutationOfficeCallRefuseArgs = {
  callId: Scalars['String']['input'];
};


export type MutationOfficeCarBookingRequestArgs = {
  arguments: OfficeBookingCarArgs;
};


export type MutationOfficeCarBookingScheduleRemoveArgs = {
  arguments: CarBookingScheduleRemoveInput;
};


export type MutationOfficeCarBookingScheduleUpdateArgs = {
  arguments: CarBookingScheduleUpdateInput;
};


export type MutationOfficeCreateMeetingRoomArgs = {
  arguments: CreateMeetingRoomArgs;
};


export type MutationOfficeCreateNotificationCampaignArgs = {
  arguments: NotificationCampaignArgs;
};


export type MutationOfficeDeleteMeetingRoomArgs = {
  arguments: DeleteMeetingRoomArgs;
};


export type MutationOfficeEditCarArgs = {
  arguments: EditOfficeCarArgs;
};


export type MutationOfficeEditTitleArgs = {
  arguments: EditOfficeTitleArgs;
};


export type MutationOfficeEmployeeAvatarUpdateArgs = {
  arguments: OfficeEmployeeAvatarUpdateInput;
};


export type MutationOfficeInitCallArgs = {
  arguments: InitCallArgs;
};


export type MutationOfficeLearningCourseCreateArgs = {
  arguments: LearningCourseCreateInput;
};


export type MutationOfficeLearningCourseReOrderSectionArgs = {
  arguments: LearningCourseReOrderSectionInput;
};


export type MutationOfficeLearningCourseRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationOfficeLearningCourseUpdateArgs = {
  arguments: LearningCourseUpdateInput;
};


export type MutationOfficeLearningCourseUpsertArgs = {
  arguments: LearningCourseUpsertInput;
};


export type MutationOfficeLearningLessonCreateArgs = {
  arguments: LearningLessonCreateInput;
};


export type MutationOfficeLearningLessonRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationOfficeLearningLessonUpdateArgs = {
  arguments: LearningLessonUpdateInput;
};


export type MutationOfficeLearningLessonUpsertArgs = {
  arguments: LearningLessonUpsertInput;
};


export type MutationOfficeLearningSectionCreateArgs = {
  arguments: LearningSectionCreateInput;
};


export type MutationOfficeLearningSectionReOrderLessonArgs = {
  arguments: LearningSectionReOrderLessonInput;
};


export type MutationOfficeLearningSectionRemoveArgs = {
  id: Scalars['String']['input'];
};


export type MutationOfficeLearningSectionUpdateArgs = {
  arguments: LearningSectionUpdateInput;
};


export type MutationOfficeLearningSectionUpsertArgs = {
  arguments: LearningSectionUpsertInput;
};


export type MutationOfficeObjectStoreGenLinkUploadArgs = {
  filename: Scalars['String']['input'];
  mimetype: Scalars['String']['input'];
  officeType: OfficeObjectType;
};


export type MutationOfficeObjectStoreUploadSuccessArgs = {
  filename: Scalars['String']['input'];
  path: Scalars['String']['input'];
};


export type MutationOfficeRemoveCarArgs = {
  id: Scalars['String']['input'];
};


export type MutationOfficeRemoveTitleArgs = {
  id: Scalars['String']['input'];
};


export type MutationOfficeRequestApprovalArgs = {
  arguments: ApprovalArgs;
};


export type MutationOfficeShoppingRequestArgs = {
  arguments: ShoppingRequestArgs;
};


export type MutationOfficeSysUserCreateArgs = {
  arguments: AddSysUserArgs;
};


export type MutationOfficeSysUserUpdateArgs = {
  arguments: EditSysUserArgs;
};


export type MutationOfficeTaskCommentCreateArgs = {
  arguments: TaskCommentCreate;
};


export type MutationOfficeTaskCommentUpdateArgs = {
  arguments: TaskCommentUpdate;
};


export type MutationOfficeTaskCreateArgs = {
  arguments: TaskCreateInput;
};


export type MutationOfficeTaskFilterCreateArgs = {
  args?: InputMaybe<TaskFilterCreateInput>;
};


export type MutationOfficeTaskFilterRemoveArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationOfficeTaskFilterUpdateArgs = {
  args?: InputMaybe<TaskFilterUpdateInput>;
};


export type MutationOfficeTaskStatusUpdateArgs = {
  arguments: TaskStatusUpdateInput;
};


export type MutationOfficeTaskUpdateArgs = {
  arguments: TaskUpdateInput;
};


export type MutationOfficeTitleBulkUpsertArgs = {
  titles: Array<UpsertTitleArgs>;
};


export type MutationOfficeUpdateApprovalActionArgs = {
  arguments: ApprovalActionArgs;
};


export type MutationOfficeUpdateBookingByAdminArgs = {
  arguments: ResponseBookingCarArgs;
};


export type MutationOfficeUpdateBookingByLeaderArgs = {
  arguments: ResponseBookingCarArgs;
};


export type MutationOfficeUpdateBookingMeetingRoomArgs = {
  arguments: UpdateBookingMeetingRoomArgs;
};


export type MutationOfficeUpdateMeetingRoomArgs = {
  arguments: UpdateMeetingRoomArgs;
};


export type MutationOfficeUpdateNotificationCampaignArgs = {
  arguments: NotificationUpdateCampaignArgs;
};


export type MutationOfficeVersionWikiCommentArgs = {
  arguments: VersionWikiCommentCreateInput;
};


export type MutationOfficeWikiCommentArgs = {
  arguments: WikiCommentCreateInput;
};


export type MutationProfileAddBlockArgs = {
  arguments: InfoBlockArgs;
};


export type MutationProfileAddFieldArgs = {
  arguments: InfoFieldArgs;
};


export type MutationProfileBlockBulkUpsertArgs = {
  blocks: Array<UpsertBlockArgs>;
};


export type MutationProfileEditBlockArgs = {
  arguments: EditInfoBlockArgs;
};


export type MutationProfileEditFieldArgs = {
  arguments: EditInfoFieldArgs;
};


export type MutationProfileFieldBulkUpsertArgs = {
  fields: Array<UpsertFieldArgs>;
};


export type MutationProfileRemoveBlockFieldArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterOrganizationDeviceArgs = {
  argument: OrgDeviceArgs;
};


export type MutationStorageActiveUsingFilesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationStorageDeleteFileArgs = {
  id: Scalars['String']['input'];
};


export type MutationStorageGeneratePresignedUrlsArgs = {
  arguments: UploadFileArgs;
};


export type MutationStorageUploadFileArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUserCheckInArgs = {
  arguments: UserCheckInArgs;
};


export type MutationUserPaycheckCommentCreateArgs = {
  arguments: UserPaycheckCommentCreate;
};


export type MutationWhitelistAddIPArgs = {
  publicIPs: Array<PublicIpArgs>;
};


export type MutationWhitelistRemoveIPArgs = {
  publicIPs: Array<Scalars['String']['input']>;
};

export type Notification = {
  attachFiles?: Maybe<Array<File>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<File>>;
  isRead: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type NotificationBookingMeetingRoomArgs = {
  attachFileIds?: InputMaybe<Array<Scalars['String']['input']>>;
  bookingId: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  endAt?: InputMaybe<Scalars['Float']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  monthDays?: InputMaybe<Array<Scalars['Int']['input']>>;
  objectType?: InputMaybe<NotificationObjectType>;
  phones?: InputMaybe<Array<Scalars['String']['input']>>;
  startAt?: InputMaybe<Scalars['Float']['input']>;
  startTimeInMinutes?: InputMaybe<Scalars['IntOrAInt']['input']>;
  status?: InputMaybe<NotificationCampaignStatus>;
  timeZone?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<NotificationScheduleType>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
  weekDays?: InputMaybe<Array<DayOfWeek>>;
};

export type NotificationCampaign = {
  attachFileUrls?: Maybe<Array<Scalars['String']['output']>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  departments?: Maybe<Array<OfficeOrgChart>>;
  endAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  monthDays?: Maybe<Array<Scalars['Int']['output']>>;
  no: Scalars['Float']['output'];
  notifyType: NotificationCampaignKind;
  objectType: NotificationObjectType;
  phones?: Maybe<Array<Scalars['String']['output']>>;
  startAt?: Maybe<Scalars['Float']['output']>;
  startTimeIn?: Maybe<Array<Scalars['Int']['output']>>;
  startTimeInMinutes?: Maybe<Scalars['String']['output']>;
  status: NotificationCampaignStatus;
  timeZone: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  titles?: Maybe<Array<OfficeTitle>>;
  type: NotificationScheduleType;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  userIds?: Maybe<Array<Scalars['String']['output']>>;
  weekDays?: Maybe<Array<DayOfWeek>>;
};

export type NotificationCampaignArgs = {
  attachFileIds?: InputMaybe<Array<Scalars['String']['input']>>;
  content: Scalars['String']['input'];
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  endAt?: InputMaybe<Scalars['Float']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  monthDays?: InputMaybe<Array<Scalars['Int']['input']>>;
  objectType?: InputMaybe<NotificationObjectType>;
  phones?: InputMaybe<Array<Scalars['String']['input']>>;
  startAt?: InputMaybe<Scalars['Float']['input']>;
  startTimeInMinutes?: InputMaybe<Scalars['IntOrAInt']['input']>;
  status?: NotificationCampaignStatus;
  timeZone?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  titleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: NotificationScheduleType;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
  weekDays?: InputMaybe<Array<DayOfWeek>>;
};

export type NotificationCampaignDifferentArgs = {
  attachFileIds?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  endAt?: InputMaybe<Scalars['Float']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  monthDays?: InputMaybe<Array<Scalars['Int']['input']>>;
  objectType?: InputMaybe<NotificationObjectType>;
  phones?: InputMaybe<Array<Scalars['String']['input']>>;
  startAt?: InputMaybe<Scalars['Float']['input']>;
  startTimeInMinutes?: InputMaybe<Scalars['IntOrAInt']['input']>;
  status?: InputMaybe<NotificationCampaignStatus>;
  timeZone?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<NotificationScheduleType>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
  weekDays?: InputMaybe<Array<DayOfWeek>>;
};

export type NotificationCampaignFilter = {
  fromDate?: InputMaybe<Scalars['Float']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<NotificationCampaignStatus>;
  toDate?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<NotificationScheduleType>;
};

export enum NotificationCampaignKind {
  Book_Car = 'Book_Car',
  Book_Car_Schedule = 'Book_Car_Schedule',
  Book_Room = 'Book_Room',
  Book_Room_Schedule = 'Book_Room_Schedule',
  Campaign = 'Campaign',
  Other = 'Other'
}

export type NotificationCampaignResponse = PagingData & {
  campaigns?: Maybe<Array<NotificationCampaign>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum NotificationCampaignStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export enum NotificationObjectType {
  Department = 'Department',
  Personal = 'Personal'
}

export type NotificationResponse = {
  count: Scalars['Int']['output'];
  notifications?: Maybe<Array<Notification>>;
  total: Scalars['Int']['output'];
};

export enum NotificationScheduleType {
  Daily = 'Daily',
  Monthly = 'Monthly',
  Now = 'Now',
  Weekly = 'Weekly'
}

export type NotificationSubscribeResponse = {
  deviceToken: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type NotificationUpdateCampaignArgs = {
  id: Scalars['String']['input'];
  status: NotificationCampaignStatus;
};

export type NumberRange = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type ObjectGenLinkWriteResponse = {
  path: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
};

export enum ObjectScope {
  Common = 'Common',
  Specified = 'Specified'
}

export enum ObjectStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export type OfficeActiveCarFilter = {
  companyId?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type OfficeApproval = {
  approvalsReference?: Maybe<Array<OfficeApproval>>;
  approvalsReferenceIds?: Maybe<Array<Scalars['String']['output']>>;
  attachmentUrls?: Maybe<Array<Scalars['String']['output']>>;
  attachments?: Maybe<Array<File>>;
  budget?: Maybe<Array<Budget>>;
  carBookingRequest?: Maybe<CarBookingRequest>;
  code?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<OfficeLogs>>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  departmentViews?: Maybe<Array<Scalars['String']['output']>>;
  fields?: Maybe<Array<ApprovalField>>;
  followerIds?: Maybe<Array<Scalars['String']['output']>>;
  formId?: Maybe<Scalars['String']['output']>;
  forward?: Maybe<ApprovalForward>;
  history?: Maybe<Array<OfficeLogs>>;
  id: Scalars['String']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  images?: Maybe<Array<File>>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  readBy?: Maybe<Array<OfficeUser>>;
  relatedDepartment?: Maybe<Array<OfficeOrgChart>>;
  relatedDepartmentIds?: Maybe<Array<Scalars['String']['output']>>;
  requester?: Maybe<OfficeUser>;
  roomBookingRequest?: Maybe<BookingMeetingRoom>;
  shoppingRequest?: Maybe<OfficeShoppingRequest>;
  source: ApprovalSource;
  status: ApprovalStatus;
  steps?: Maybe<Array<ApprovalStep>>;
  subcribers?: Maybe<Array<OfficeUser>>;
  subscriberIds?: Maybe<Array<Scalars['String']['output']>>;
  subscribersDefault?: Maybe<Array<OfficeUser>>;
  type?: Maybe<ApprovalType>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  userViews?: Maybe<Array<Scalars['String']['output']>>;
  versionWikiApproval?: Maybe<VersionWiki>;
  wiki?: Maybe<DocumentWiki>;
  yourAction?: Maybe<ApprovalAction>;
};

export type OfficeAttachmentType = {
  list?: Maybe<Array<Scalars['String']['output']>>;
  type?: Maybe<OfficeFeatureLogAttachmentType>;
};

export type OfficeBookingCarArgs = {
  carId: Scalars['String']['input'];
  endAt: Scalars['Float']['input'];
  formFieldData?: InputMaybe<Scalars['JSON']['input']>;
  fromAddress: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  notify?: InputMaybe<NotificationCampaignDifferentArgs>;
  repeatConfig?: InputMaybe<BookCarRepeatConfigInput>;
  startAt: Scalars['Float']['input'];
  subscriberIds?: InputMaybe<Array<Scalars['String']['input']>>;
  toAddress: Scalars['String']['input'];
};

export type OfficeCarArgs = {
  approvalFormId?: InputMaybe<Scalars['String']['input']>;
  capacity: Scalars['Int']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  model: Scalars['String']['input'];
  orgChartId?: InputMaybe<Scalars['String']['input']>;
  plateNumber: Scalars['String']['input'];
  status?: ObjectStatus;
};

export type OfficeCarFilter = {
  approvalFormId?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  orgChartId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type OfficeChatConversation = {
  backgroundUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  creator: OfficeUser;
  description?: Maybe<Scalars['String']['output']>;
  groupType?: Maybe<ChatConversationGroupType>;
  id: Scalars['String']['output'];
  imgUrl?: Maybe<Scalars['String']['output']>;
  lastMessage?: Maybe<OfficeChatMessage>;
  lastMessageAt?: Maybe<Scalars['Float']['output']>;
  lastMessageId?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<OfficeChatConversationMember>>;
  name?: Maybe<Scalars['String']['output']>;
  personalConversation?: Maybe<OfficeChatConversationMember>;
  type: ChatConversationType;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type OfficeChatConversationMember = {
  admin?: Maybe<Scalars['Boolean']['output']>;
  connected?: Maybe<Scalars['Boolean']['output']>;
  conversation: OfficeChatConversation;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  creator: OfficeUser;
  hide?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lastMessageReadId?: Maybe<Scalars['String']['output']>;
  unreadCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  user: OfficeUser;
  userId?: Maybe<Scalars['String']['output']>;
  viewMessagesFrom?: Maybe<Scalars['Float']['output']>;
};

export type OfficeChatLinkPreviewResponse = {
  data?: Maybe<Scalars['JSON']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type OfficeChatMessage = {
  actionType?: Maybe<ConversationActionType>;
  actor?: Maybe<OfficeUser>;
  actorId?: Maybe<Scalars['String']['output']>;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  editAt?: Maybe<Scalars['Float']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  forwardedFromMessage?: Maybe<OfficeChatMessage>;
  forwardedFromMessageId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mentionTo?: Maybe<Array<OfficeUser>>;
  message?: Maybe<Scalars['String']['output']>;
  newValue?: Maybe<Scalars['String']['output']>;
  oldValue?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<Array<OfficeChatMessageReaction>>;
  readerIds?: Maybe<Array<Scalars['String']['output']>>;
  readers?: Maybe<Array<OfficeUser>>;
  replyMessage?: Maybe<OfficeChatMessage>;
  replyMessageId?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<OfficeUser>;
  senderId?: Maybe<Scalars['String']['output']>;
  targetUserIds?: Maybe<Array<Scalars['String']['output']>>;
  targetUsers?: Maybe<Array<OfficeUser>>;
  type?: Maybe<ChatMessageType>;
  urls?: Maybe<Array<Scalars['String']['output']>>;
};

export type OfficeChatMessageReaction = {
  code: Scalars['String']['output'];
  reactorIds?: Maybe<Array<Scalars['String']['output']>>;
  reactors?: Maybe<Array<OfficeUser>>;
};

export type OfficeChatMessageReader = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  user: OfficeUser;
};

export type OfficeChatMessageSearchArgs = {
  chatMessageType?: InputMaybe<Array<ChatMessageType>>;
  chatType?: InputMaybe<ChatType>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  partnerId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type OfficeChatMessageSearchResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<Scalars['JSON']['output']>>;
  total: Scalars['Int']['output'];
};

export type OfficeEmployeeAvatarUpdateInput = {
  imageId: Scalars['String']['input'];
};

export enum OfficeFeatureLogAttachmentType {
  Attachment = 'Attachment',
  Image = 'Image'
}

export type OfficeFilter = {
  approvals?: Maybe<Array<OfficeUser>>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  creators?: Maybe<Array<OfficeUser>>;
  dataExplains?: Maybe<Scalars['JSON']['output']>;
  departments?: Maybe<Array<OfficeOrgChart>>;
  filter?: Maybe<Scalars['JSON']['output']>;
  forms?: Maybe<Array<ApprovalForm>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ActiveStatus>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type OfficeLogData = {
  action?: Maybe<LogAction>;
  actionAt?: Maybe<Scalars['Float']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  newValue?: Maybe<Scalars['JSON']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  oldValue?: Maybe<Scalars['JSON']['output']>;
};

export enum OfficeLogStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export enum OfficeLogType {
  Comment = 'Comment',
  History = 'History'
}

export type OfficeLogs = {
  adminCreator?: Maybe<OfficeSysUser>;
  attachments?: Maybe<Array<File>>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<OfficeUser>;
  creatorRole?: Maybe<RequesterRole>;
  /** noi dung comment */
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<File>>;
  logs?: Maybe<Array<OfficeLogData>>;
  objectType?: Maybe<Array<OfficeAttachmentType>>;
  orgCharts?: Maybe<Array<OfficeOrgChart>>;
  status: OfficeLogStatus;
  type: OfficeLogType;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  userCreator?: Maybe<OfficeUser>;
};

export type OfficeObject = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  encoding?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  mimetype?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  size?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type OfficeObjectStoreGenLinkUpload = {
  path: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
};

export enum OfficeObjectType {
  Task = 'Task'
}

export type OfficeOrgChart = {
  approver?: Maybe<OfficeUser>;
  approverId?: Maybe<Scalars['String']['output']>;
  assets?: Maybe<Array<Asset>>;
  assetsAssigned?: Maybe<Array<Asset>>;
  assetsManagement?: Maybe<Array<Asset>>;
  categoryAssets?: Maybe<Array<CategoryAsset>>;
  code?: Maybe<Scalars['String']['output']>;
  companyId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  level?: Maybe<Scalars['Int']['output']>;
  logs?: Maybe<Array<OfficeLogs>>;
  name: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<OfficeOrgChart>;
  parentId: Scalars['String']['output'];
  path: Scalars['String']['output'];
  payrolls?: Maybe<Array<OfficePayroll>>;
  projects?: Maybe<Array<OfficeTaskProject>>;
  status: ObjectStatus;
  type: OrgChartType;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  warehouseAssets?: Maybe<Array<WarehouseAsset>>;
  workProfiles?: Maybe<UserWorkProfileDetail>;
};

export type OfficePayroll = {
  blocks?: Maybe<Array<InfoBlock>>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  orgCharts?: Maybe<Array<OfficeOrgChart>>;
  paychecks?: Maybe<Array<OfficeUserPaycheck>>;
  status: ObjectStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type OfficeShoppingRequest = {
  approvalId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  expectedCost?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  no: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  requester?: Maybe<OfficeUser>;
  shoppingApproval?: Maybe<OfficeApproval>;
  status: RequestStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type OfficeSysUser = {
  businessRole?: Maybe<BusinessRole>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  createdByUser?: Maybe<OfficeSysUser>;
  email?: Maybe<Scalars['String']['output']>;
  fullname: Scalars['String']['output'];
  id: Scalars['String']['output'];
  linkedUser?: Maybe<OfficeUser>;
  logs?: Maybe<Array<OfficeLogs>>;
  no: Scalars['Float']['output'];
  orgChartIds?: Maybe<Array<Scalars['String']['output']>>;
  orgCharts?: Maybe<Array<OfficeOrgChart>>;
  phone?: Maybe<Scalars['String']['output']>;
  status: ObjectStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  updatedByUser?: Maybe<OfficeSysUser>;
};

export type OfficeSysUserResponse = PagingData & {
  count: Scalars['Int']['output'];
  sysUsers?: Maybe<Array<OfficeSysUser>>;
  total: Scalars['Int']['output'];
};

export type OfficeTask = {
  assigned?: Maybe<OfficeUser>;
  assignees?: Maybe<Array<OfficeUser>>;
  attachmentUrls?: Maybe<Array<Scalars['String']['output']>>;
  attachments?: Maybe<Array<File>>;
  childrenTask?: Maybe<Array<OfficeTask>>;
  clonesTask?: Maybe<Array<OfficeTask>>;
  comments?: Maybe<Array<OfficeTaskLog>>;
  config?: Maybe<CloneByDate>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<OfficeUser>;
  description?: Maybe<Scalars['String']['output']>;
  doneAt?: Maybe<Scalars['Float']['output']>;
  finishTime?: Maybe<Scalars['Float']['output']>;
  histories?: Maybe<Array<OfficeTaskLog>>;
  id: Scalars['String']['output'];
  isLate?: Maybe<Scalars['Boolean']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  keyPostfix?: Maybe<Scalars['String']['output']>;
  linkTasks?: Maybe<Array<OfficeTask>>;
  no: Scalars['Float']['output'];
  parentTask?: Maybe<OfficeTask>;
  priority?: Maybe<TaskPriority>;
  project?: Maybe<OfficeTaskProject>;
  reporter?: Maybe<OfficeUser>;
  startTime?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<TaskStatus>;
  taskKind?: Maybe<TaskKindEnum>;
  taskType?: Maybe<TaskTypeEnum>;
  templateTask?: Maybe<OfficeTask>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  watchers?: Maybe<Array<OfficeUser>>;
};

export type OfficeTaskListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<OfficeTask>>;
  statistics?: Maybe<Array<OfficeTaskStatisticResponse>>;
  total: Scalars['Int']['output'];
};

export type OfficeTaskLog = {
  attachments?: Maybe<Array<File>>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<OfficeUser>;
  /** noi dung comment */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  images?: Maybe<Array<File>>;
  logs?: Maybe<Array<LogData>>;
  objectType?: Maybe<Array<OfficeAttachmentType>>;
  task?: Maybe<OfficeTask>;
  type: TaskLogType;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type OfficeTaskProject = {
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rootOrg?: Maybe<OfficeOrgChart>;
  showKey?: Maybe<Scalars['Boolean']['output']>;
  tasks?: Maybe<OfficeTask>;
};

export type OfficeTaskStatisticResponse = {
  count?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<TaskStatus>;
};

export type OfficeTitle = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  note?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workProfiles?: Maybe<UserWorkProfileDetail>;
};

export type OfficeTitleArgs = {
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type OfficeTitleFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type OfficeTitleResponse = PagingData & {
  count: Scalars['Int']['output'];
  titles?: Maybe<Array<OfficeTitle>>;
  total: Scalars['Int']['output'];
};

export type OfficeUser = {
  address?: Maybe<UserAddress>;
  age?: Maybe<Scalars['Int']['output']>;
  appInfoBlocks?: Maybe<Array<InfoBlock>>;
  approvalForms?: Maybe<Array<ApprovalForm>>;
  approvalsRead?: Maybe<Array<OfficeApproval>>;
  assetsAssigned?: Maybe<Array<Asset>>;
  assetsManagement?: Maybe<Array<Asset>>;
  attachFileUrls?: Maybe<Array<Scalars['String']['output']>>;
  attachFiles?: Maybe<Array<File>>;
  bankAccount?: Maybe<UserBankAccount>;
  code?: Maybe<Scalars['String']['output']>;
  company?: Maybe<OfficeOrgChart>;
  conversations?: Maybe<OfficeChatConversationMember>;
  courses?: Maybe<Array<LearnCourse>>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  createdByUser?: Maybe<OfficeSysUser>;
  creatorConversation?: Maybe<OfficeChatConversation>;
  dateOfBirth?: Maybe<Scalars['Float']['output']>;
  departmentLever?: Maybe<UserListDepartment>;
  departmentName?: Maybe<Scalars['String']['output']>;
  departments?: Maybe<Array<UserDepartment>>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  hrCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  idCardIssuedOn?: Maybe<Scalars['Float']['output']>;
  idCardIssuedPlace?: Maybe<Scalars['String']['output']>;
  identityCard?: Maybe<Scalars['String']['output']>;
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  infoBlocks?: Maybe<Array<InfoBlock>>;
  lastLoginAt?: Maybe<Scalars['Float']['output']>;
  lastWorkingOn?: Maybe<Scalars['Float']['output']>;
  leader?: Maybe<OfficeUser>;
  learnStudents?: Maybe<Array<LearnStudent>>;
  leaveOn?: Maybe<Scalars['Float']['output']>;
  logs?: Maybe<Array<OfficeLogs>>;
  major?: Maybe<Scalars['String']['output']>;
  messagesReader?: Maybe<Array<OfficeChatMessageReader>>;
  no?: Maybe<Scalars['Float']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  officalWorkingOn?: Maybe<Scalars['Float']['output']>;
  offlineAt?: Maybe<Scalars['Float']['output']>;
  onboardingOn?: Maybe<Scalars['Float']['output']>;
  optionTitle?: Maybe<Scalars['String']['output']>;
  paychecks?: Maybe<Array<OfficeUserPaycheck>>;
  personalEmail?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<Array<OfficeChatMessageReaction>>;
  relativePhone?: Maybe<Scalars['String']['output']>;
  resignationDetailReason?: Maybe<Scalars['String']['output']>;
  resignationReason?: Maybe<Scalars['String']['output']>;
  resignationType?: Maybe<Scalars['String']['output']>;
  resigned?: Maybe<Scalars['Boolean']['output']>;
  rtcUserId?: Maybe<Scalars['Float']['output']>;
  seniority?: Maybe<Scalars['Int']['output']>;
  socialInsuranceCode?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ObjectStatus>;
  statusActive?: Maybe<Scalars['String']['output']>;
  taskWatchers?: Maybe<Array<OfficeTask>>;
  tasksAssigned?: Maybe<Array<OfficeTask>>;
  tasksCreated?: Maybe<Array<OfficeTask>>;
  tasksLog?: Maybe<Array<OfficeTaskLog>>;
  taxCode?: Maybe<Scalars['String']['output']>;
  tempAddress?: Maybe<UserAddress>;
  titleName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  updatedByUser?: Maybe<OfficeSysUser>;
  workProfile?: Maybe<UserWorkProfile>;
};

export type OfficeUserFilter = {
  departmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  l1Id?: InputMaybe<Scalars['String']['input']>;
  l2Id?: InputMaybe<Scalars['String']['input']>;
  l3Id?: InputMaybe<Scalars['String']['input']>;
  l4Id?: InputMaybe<Scalars['String']['input']>;
  l5Id?: InputMaybe<Scalars['String']['input']>;
  l6Id?: InputMaybe<Scalars['String']['input']>;
  lCurrentId?: InputMaybe<Scalars['String']['input']>;
  lastWorkingOn?: InputMaybe<DatePeriod>;
  leaveOn?: InputMaybe<DatePeriod>;
  major?: InputMaybe<Scalars['String']['input']>;
  onboardingOn?: InputMaybe<DatePeriod>;
  orderBy?: InputMaybe<OrderUserBy>;
  page?: InputMaybe<Scalars['Float']['input']>;
  resignationReason?: InputMaybe<Scalars['String']['input']>;
  resignationType?: InputMaybe<Scalars['String']['input']>;
  resigned?: InputMaybe<Scalars['Boolean']['input']>;
  seniority?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ObjectStatus>;
  titleId?: InputMaybe<Scalars['String']['input']>;
};

export type OfficeUserPaycheck = {
  code?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<OfficeLogs>>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  encode?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  infoBlocks?: Maybe<Array<InfoBlock>>;
  month?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  no?: Maybe<Scalars['String']['output']>;
  payroll?: Maybe<OfficePayroll>;
  status?: Maybe<PaycheckStatus>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<OfficeUser>;
  wage?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type OfficeUserResponse = PagingData & {
  count: Scalars['Int']['output'];
  officeUsers?: Maybe<Array<OfficeUser>>;
  total: Scalars['Int']['output'];
};

export type OfficeWikiFilter = {
  folderIds?: InputMaybe<Array<Scalars['String']['input']>>;
  importants?: InputMaybe<Array<WikiImportant>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  ordinal?: InputMaybe<OrdinalCase>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type OfficeWorkProfileFilter = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type OfficeWorkingShift = {
  code: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  outOfTimes?: Maybe<OfficeWorkingShiftOutOfTime>;
  overTimes?: Maybe<OfficeWorkingShiftOverTime>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type OfficeWorkingShiftOutOfTime = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  from: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  punishmentType: WorkShiftOutOfTimePunishment;
  punishmentValue?: Maybe<Scalars['Float']['output']>;
  to: Scalars['Float']['output'];
  type: OutOfTime;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workingShift: OfficeWorkingShift;
};

export type OfficeWorkingShiftOverTime = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isStartAfterEndShift?: Maybe<Scalars['Boolean']['output']>;
  maxTime?: Maybe<Scalars['Float']['output']>;
  minTime?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['Float']['output']>;
  type: OverTime;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workingShift: OfficeWorkingShift;
};

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type OrderListProjectArgs = {
  direction: OrderDirection;
  key: Scalars['String']['input'];
};

/** Enum for sorting employees */
export enum OrderUserBy {
  Department = 'Department'
}

export enum OrdinalCase {
  Asc = 'Asc',
  Desc = 'Desc',
  NameAsc = 'NameAsc',
  NameDesc = 'NameDesc',
  ViewerAsc = 'ViewerAsc',
  ViewerDesc = 'ViewerDesc'
}

export type OrgChartArgs = {
  approverId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type OrgChartFilter = {
  adminId?: InputMaybe<Scalars['String']['input']>;
  haveNoManager?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  orgType?: InputMaybe<GetOrgChartType>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type OrgChartFullListFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  rootId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  statuses?: InputMaybe<Array<ActiveStatus>>;
};

export type OrgChartResponse = PagingData & {
  count: Scalars['Int']['output'];
  orgCharts?: Maybe<Array<OfficeOrgChart>>;
  total: Scalars['Int']['output'];
};

export enum OrgChartType {
  Unknown = 'Unknown'
}

export type OrgDeviceArgs = {
  identifierForVendor: Scalars['String']['input'];
  model: Scalars['String']['input'];
  name: Scalars['String']['input'];
  versionOS?: InputMaybe<Scalars['String']['input']>;
};

export type OrgDeviceFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type Organization = {
  address?: Maybe<Address>;
  area?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  distributorChanel?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  pdaCode?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  regionCode?: Maybe<Scalars['String']['output']>;
  salesOffice?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type OrganizationDevice = {
  adminUpdatedAt?: Maybe<Scalars['Float']['output']>;
  approvedAt?: Maybe<Scalars['Float']['output']>;
  businessRoleId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  identifierForVendor: Scalars['String']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: OrganizationDeviceStatus;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<OfficeUser>;
  userId?: Maybe<Scalars['String']['output']>;
  versionOS?: Maybe<Scalars['String']['output']>;
};

export type OrganizationDeviceResponse = PagingData & {
  count: Scalars['Int']['output'];
  result?: Maybe<Array<OrganizationDevice>>;
  total: Scalars['Int']['output'];
};

export enum OrganizationDeviceStatus {
  APPROVED = 'APPROVED',
  REQUEST = 'REQUEST'
}

export type OrganizationFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationResponse = {
  count: Scalars['Int']['output'];
  organizations?: Maybe<Array<Organization>>;
  total: Scalars['Int']['output'];
};

export type OtpResponse = {
  organization: Scalars['String']['output'];
  session: Scalars['String']['output'];
  target: Scalars['String']['output'];
};

export enum OutOfTime {
  Late = 'Late',
  Soon = 'Soon'
}

export enum OverTime {
  After = 'After',
  Before = 'Before'
}

export type PagingData = {
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum PaycheckStatus {
  Done = 'Done',
  In_progress = 'In_progress'
}

export type PayrollBlockBulkResponse = {
  code?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payrollCode?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type PayrollBlockBulkUpsertInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payrollCode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type PayrollBlockBulkUpsertResponse = {
  records?: Maybe<Array<PayrollBlockBulkResponse>>;
};

export type PayrollBlockCreateInput = {
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  payrollId: Scalars['String']['input'];
  status?: InputMaybe<ObjectStatus>;
};

export type PayrollBlockFieldCreateInput = {
  blockId: Scalars['String']['input'];
  dataType?: InputMaybe<DataType>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  optionItems?: InputMaybe<Array<Scalars['String']['input']>>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type PayrollBlockFieldUpdateInput = {
  blockId?: InputMaybe<Scalars['String']['input']>;
  dataType?: InputMaybe<DataType>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  optionItems?: InputMaybe<Array<Scalars['String']['input']>>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type PayrollBlockUpdateInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  payrollId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type PayrollBulkResponse = {
  code?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type PayrollBulkUpsertInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orgChartIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type PayrollBulkUpsertResponse = {
  records?: Maybe<Array<PayrollBulkResponse>>;
};

export type PayrollCreateInput = {
  name: Scalars['String']['input'];
  orgChartIds: Array<Scalars['String']['input']>;
  status: ObjectStatus;
};

export type PayrollListFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type PayrollListResponse = PagingData & {
  count: Scalars['Int']['output'];
  payrolls?: Maybe<Array<OfficePayroll>>;
  total: Scalars['Int']['output'];
};

export type PayrollUpdateInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  orgChartIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<ObjectStatus>;
};

export type Permission = {
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  policies?: Maybe<Array<Policy>>;
};

export type PermissionBusinessRoleFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type Policy = {
  actions?: Maybe<Array<PolicyAction>>;
  condition?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  effect?: Maybe<PolicyEffect>;
  id: Scalars['String']['output'];
  service?: Maybe<PolicyService>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type PolicyAction = {
  children?: Maybe<Array<PolicyAction>>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  effect?: Maybe<PolicyEffect>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PolicyAction>;
  service?: Maybe<PolicyService>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type PolicyActionResponse = {
  actions?: Maybe<Array<PolicyAction>>;
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PolicyEffect = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type PolicyService = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PolicyService>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export enum ProjectTimeTypeEnum {
  FIXED = 'FIXED',
  PERIOD = 'PERIOD'
}

export type PublicIpArgs = {
  ip: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  addressGetCountries: AddressZoneResponse;
  addressGetDistricts: AddressZoneResponse;
  addressGetLocationByText: LocationResponse;
  addressGetProvinces: AddressZoneResponse;
  addressGetWards: AddressZoneResponse;
  addressGetZoneByLocation: AddressResponse;
  addressZoneGetList: AddressZoneResponse;
  adminOrgChartList: OrgChartResponse;
  analysisNumberOfUserUsedApp?: Maybe<AnalysisNumberOfUserUsedAppResponse>;
  appBusinessRoleAvailableList: BusinessRoleResponse;
  appNotificationGetList: NotificationResponse;
  approvalGet?: Maybe<OfficeApproval>;
  chatConversationDetail?: Maybe<OfficeChatConversation>;
  chatConversationList?: Maybe<ChatConversationListResponse>;
  chatMessageList?: Maybe<ChatMessageListResponse>;
  chatSearch?: Maybe<Array<OfficeChatMessage>>;
  checkInGetBeaconList: CheckInBeaconResponse;
  checkInGetDetail: CheckIn;
  checkInGetHistories: CheckInResponse;
  checkInGetPlace: CheckInPlace;
  checkInGetPlaceList: CheckInPlaceResponse;
  checkInGetUpTime: CheckInUpTime;
  checkInGetUpTimeByPlace: Array<CheckInUpTime>;
  documentFolderElements: DocumentElementResponse;
  documentFolderTree: DocumentFolderResponse;
  documentGetFile: DocumentFile;
  documentGetFolder: DocumentFolder;
  documentSearchElements: DocumentElementResponse;
  getListOrganizationDevices: OrganizationDeviceResponse;
  getListOrganizationDevicesApproved: Array<OrganizationDevice>;
  iamAccessGetPermission: AccessPermission;
  identifyCardPlaceList?: Maybe<IdentifyCardPlaceListResponse>;
  identityBankGetList: BankResponse;
  identityCarrierGetList: CarrierResponse;
  identityProfile: User;
  manageAdminInfoGet?: Maybe<OfficeSysUser>;
  manageDocumentTagGet?: Maybe<TagDocument>;
  manageDocumentTagList?: Maybe<DocumentTagResponse>;
  manageLearningAddressGet?: Maybe<LearnAddress>;
  manageLearningAddressList?: Maybe<LearningAddressResponse>;
  manageLearningCertificateGet?: Maybe<LearnCertification>;
  manageLearningCertificateList?: Maybe<LearningCertificateResponse>;
  manageLearningCourseGet?: Maybe<LearnCourse>;
  manageLearningCourseList?: Maybe<LearningCourseResponse>;
  manageLearningLessonGet?: Maybe<LearnLesson>;
  manageLearningLessonList?: Maybe<LearningLessonResponse>;
  manageLearningProjectGet?: Maybe<LearnProject>;
  manageLearningProjectList?: Maybe<LearningProjectResponse>;
  manageLearningSectionGet?: Maybe<LearnSection>;
  manageLearningSectionList?: Maybe<LearningSectionResponse>;
  manageLearningSkillGet?: Maybe<LearnSkill>;
  manageLearningSkillList?: Maybe<LearningSkillResponse>;
  manageWikiCategoryGet?: Maybe<CategoryWiki>;
  manageWikiCategoryList?: Maybe<CategoryWikiResponse>;
  manageWikiGet?: Maybe<DocumentWiki>;
  manageWikiList?: Maybe<DocumentWikiListResponse>;
  managementAssetGet?: Maybe<Asset>;
  managementAssetList?: Maybe<AssetListResponse>;
  managementCategoryAssetList?: Maybe<CategoryAssetListResponse>;
  managementEmployeeReportDetailExport?: Maybe<File>;
  managementEmployeeReportSummaryExport?: Maybe<File>;
  managementEmployeeResignReportExport?: Maybe<File>;
  managementGetEmployee: OfficeUser;
  managementGetEmployeeList?: Maybe<OfficeUserResponse>;
  managementGetEmployeeSchedule: SchedulesResponse;
  managementImportAssetFieldsKeyList?: Maybe<FieldsListResponse>;
  managementImportAssetFieldsTitleList?: Maybe<FieldsListResponse>;
  managementImportAssetTemplateExport?: Maybe<File>;
  managementImportUserCreateFieldsGet?: Maybe<FieldsListResponse>;
  managementImportUserCreateFieldsGetTitle?: Maybe<FieldsListResponse>;
  managementImportUserCreateTemplateExport?: Maybe<File>;
  managementImportUserFieldsGet?: Maybe<ImportUserFieldsGetResponse>;
  managementImportUserFieldsGetTitle?: Maybe<ImportUserFieldsGetResponse>;
  managementImportUserTemplateExport?: Maybe<File>;
  managementImportWorkProfileFieldsGet?: Maybe<ImportUserFieldsGetResponse>;
  managementImportWorkProfileFieldsGetTitle?: Maybe<ImportUserFieldsGetResponse>;
  managementImportWorkProfileTemplateExport?: Maybe<File>;
  managementInfoFieldGet?: Maybe<InfoField>;
  managementListEmployeeOfOrgChart: OfficeUserResponse;
  managementOrgChartExport?: Maybe<File>;
  managementOrgChartFullList: OrgChartResponse;
  managementOrgChartList: OrgChartResponse;
  managementOrgChartTree: OrgChartResponse;
  managementPayrollGet?: Maybe<OfficePayroll>;
  managementPayrollList?: Maybe<PayrollListResponse>;
  managementUserPaycheckGet?: Maybe<OfficeUserPaycheck>;
  managementUserPaycheckList?: Maybe<UserPaycheckListResponse>;
  managementWarehouseAssetList?: Maybe<WarehouseAssetListResponse>;
  managementWorkProfileExport?: Maybe<File>;
  managementWorkProfileGet?: Maybe<UserWorkProfile>;
  managementWorkProfileGetSoftFields?: Maybe<Array<InfoField>>;
  managementWorkProfileInfoTypeGetList?: Maybe<Array<WorkProfileInfoType>>;
  managementWorkProfileList?: Maybe<WorkProfileListResponse>;
  managerApprovalFormGroupGet?: Maybe<ApprovalFormGroup>;
  managerApprovalFormGroupList?: Maybe<ApprovalFormGroupResponse>;
  notificationGetList: NotificationResponse;
  officeApprovalFilterGet: OfficeFilter;
  officeApprovalFilterList: ApprovalFilterListResponse;
  officeApprovalFormGetList: ApprovalFormResponse;
  officeApprovalFormGroupList?: Maybe<ApprovalFormGroupResponse>;
  officeApprovalGetForm: ApprovalForm;
  officeApprovalMenuCount: ApprovalMenuResponse;
  officeCarBookingGetSchedule: CarBookingSchedule;
  officeCarBookingGetScheduleList: CarBookingScheduleResponse;
  officeChatLinkPreview?: Maybe<OfficeChatLinkPreviewResponse>;
  officeChatMessageSearch?: Maybe<OfficeChatMessageSearchResponse>;
  officeDocumentTagList?: Maybe<DocumentTagResponse>;
  officeEmployeeFullOrgChartList: OfficeUserResponse;
  officeFetchCallToken: CallTokenResponse;
  officeFetchRTMToken: RTMTokenResponse;
  officeGetActiveCars: CarResponse;
  officeGetApproval: OfficeApproval;
  officeGetApprovalList: ApprovalResponse;
  officeGetApprovalPublic: OfficeApproval;
  officeGetBookingCarSchedule: BookingsCarResponse;
  officeGetCars: CarResponse;
  officeGetMeetingDetail: MeetingDetailResponse;
  officeGetMeetingSchedule: MeetingsResponse;
  officeGetNotificationCampaignList: NotificationCampaignResponse;
  officeGetTitles: OfficeTitleResponse;
  officeLearningCertificateGet?: Maybe<LearnCertification>;
  officeLearningCertificateList?: Maybe<LearningCertificateResponse>;
  officeLearningCourseGet?: Maybe<LearnCourse>;
  officeLearningCourseList?: Maybe<LearningCourseResponse>;
  officeLearningLessonGet?: Maybe<LearnLesson>;
  officeLearningLessonList?: Maybe<LearningLessonResponse>;
  officeLearningProjectGet?: Maybe<LearnProject>;
  officeLearningProjectList?: Maybe<LearningProjectResponse>;
  officeLearningSectionGet?: Maybe<LearnSection>;
  officeLearningSectionList?: Maybe<LearningSectionResponse>;
  officeLearningSkillGet?: Maybe<LearnSkill>;
  officeLearningSkillList?: Maybe<LearningSkillResponse>;
  officeListEmployeeOfOrgChart: OfficeUserResponse;
  officeMeetingRoomGetList: MeetingRoomsResponse;
  officeOrgChartList: OrgChartResponse;
  officePermissionActionGetList: PolicyActionResponse;
  officePermissionBusinessRoleGetList: BusinessRoleResponse;
  officeSysUserGetList: OfficeSysUserResponse;
  officeTaskFilterGet: OfficeFilter;
  officeTaskFilterList: TaskFilterListResponse;
  officeTaskGet?: Maybe<OfficeTask>;
  officeTaskList?: Maybe<OfficeTaskListResponse>;
  officeTaskReportConfigList?: Maybe<OfficeTaskListResponse>;
  officeUserPaycheckGet?: Maybe<OfficeUserPaycheck>;
  officeUserPaycheckList?: Maybe<UserPaycheckListResponse>;
  officeWikiCategoryList?: Maybe<CategoryWikiResponse>;
  officeWikiGet?: Maybe<DocumentWiki>;
  officeWikiLatestList?: Maybe<DocumentWikiListResponse>;
  officeWikiList?: Maybe<DocumentWikiListResponse>;
  officeWorkProfileList?: Maybe<WorkProfileListResponse>;
  organizationGetByCode: Organization;
  organizationGetByPhone: OrganizationResponse;
  organizationGetGroup: OrganizationResponse;
  organizationGetList: OrganizationResponse;
  profileGetBlocks: InfoBlockResponse;
  profileGetFields: InfoFieldResponse;
  steamGetListSale: OrganizationResponse;
  whitelistGetIPs: WhitelistIPResponse;
};


export type QueryAddressGetCountriesArgs = {
  filter?: InputMaybe<AddressZoneFilterArgs>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAddressGetDistrictsArgs = {
  filter?: InputMaybe<AddressZoneFilterArgs>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  provinceId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAddressGetLocationByTextArgs = {
  params: AddressTextArgs;
};


export type QueryAddressGetProvincesArgs = {
  countryId?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AddressZoneFilterArgs>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAddressGetWardsArgs = {
  districtId: Scalars['String']['input'];
  filter?: InputMaybe<AddressZoneFilterArgs>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAddressGetZoneByLocationArgs = {
  params: LocationArgs;
};


export type QueryAddressZoneGetListArgs = {
  filter?: InputMaybe<AddressZoneFilterArgs>;
};


export type QueryAdminOrgChartListArgs = {
  filter?: InputMaybe<SysOrgChartFilter>;
};


export type QueryAnalysisNumberOfUserUsedAppArgs = {
  filter?: InputMaybe<AnalysisNumberOfUserUsedAppFilter>;
};


export type QueryAppNotificationGetListArgs = {
  filter?: InputMaybe<AppNotificationFilterArgs>;
};


export type QueryApprovalGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryChatConversationDetailArgs = {
  conversationId?: InputMaybe<Scalars['String']['input']>;
  receiverId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryChatConversationListArgs = {
  filters: ChatConversationListFilter;
};


export type QueryChatMessageListArgs = {
  filters: ChatMessageGetListFilter;
};


export type QueryChatSearchArgs = {
  filters: ChatSearchArgs;
};


export type QueryCheckInGetBeaconListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCheckInGetDetailArgs = {
  id: Scalars['String']['input'];
};


export type QueryCheckInGetHistoriesArgs = {
  filter?: InputMaybe<CheckInHistoryFilter>;
};


export type QueryCheckInGetPlaceArgs = {
  id: Scalars['String']['input'];
};


export type QueryCheckInGetPlaceListArgs = {
  filter?: InputMaybe<CheckInPlaceFilter>;
};


export type QueryCheckInGetUpTimeArgs = {
  id: Scalars['String']['input'];
};


export type QueryCheckInGetUpTimeByPlaceArgs = {
  placeId: Scalars['String']['input'];
};


export type QueryDocumentFolderElementsArgs = {
  filter?: InputMaybe<DocumentElementFilter>;
  folderId?: Scalars['String']['input'];
  order?: InputMaybe<DocumentOrderBy>;
};


export type QueryDocumentFolderTreeArgs = {
  parentId?: Scalars['String']['input'];
};


export type QueryDocumentGetFileArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocumentGetFolderArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocumentSearchElementsArgs = {
  filter?: InputMaybe<DocumentElementFilter>;
  folderId?: Scalars['String']['input'];
  order?: InputMaybe<DocumentOrderBy>;
};


export type QueryGetListOrganizationDevicesArgs = {
  filter?: InputMaybe<OrgDeviceFilter>;
};


export type QueryIdentityBankGetListArgs = {
  filter?: InputMaybe<BankFilterArgs>;
};


export type QueryIdentityCarrierGetListArgs = {
  filter?: InputMaybe<CarrierFilterArgs>;
};


export type QueryIdentityProfileArgs = {
  argument?: InputMaybe<IdentityOrgDeviceArgs>;
};


export type QueryManageDocumentTagGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageDocumentTagListArgs = {
  filter?: InputMaybe<DocumentTagFilterInput>;
};


export type QueryManageLearningAddressGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageLearningAddressListArgs = {
  filter?: InputMaybe<AddressLearningFilterInput>;
};


export type QueryManageLearningCertificateGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageLearningCertificateListArgs = {
  filter?: InputMaybe<LearningCertificateFilterInput>;
};


export type QueryManageLearningCourseGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageLearningCourseListArgs = {
  filter?: InputMaybe<LearningCourseFilterInput>;
};


export type QueryManageLearningLessonGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageLearningLessonListArgs = {
  filter?: InputMaybe<LearningLessonFilterInput>;
};


export type QueryManageLearningProjectGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageLearningProjectListArgs = {
  filter?: InputMaybe<LearningProjectFilterInput>;
};


export type QueryManageLearningSectionGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageLearningSectionListArgs = {
  filter?: InputMaybe<LearningSectionFilterInput>;
};


export type QueryManageLearningSkillGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageLearningSkillListArgs = {
  filter?: InputMaybe<LearningSkillFilterInput>;
};


export type QueryManageWikiCategoryGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageWikiCategoryListArgs = {
  filter?: InputMaybe<WikiCategoryFilterInput>;
};


export type QueryManageWikiGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManageWikiListArgs = {
  filter?: InputMaybe<ManageWikiFilter>;
};


export type QueryManagementAssetGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManagementAssetListArgs = {
  filter?: InputMaybe<ManagementAssetFilter>;
};


export type QueryManagementCategoryAssetListArgs = {
  filter?: InputMaybe<ManagementCategoryAssetFilter>;
};


export type QueryManagementEmployeeReportDetailExportArgs = {
  filter?: InputMaybe<EmployeeReportFilterArgs>;
};


export type QueryManagementEmployeeReportSummaryExportArgs = {
  filter?: InputMaybe<EmployeeReportFilterArgs>;
};


export type QueryManagementEmployeeResignReportExportArgs = {
  filter?: InputMaybe<EmployeeReportFilterArgs>;
};


export type QueryManagementGetEmployeeArgs = {
  id: Scalars['String']['input'];
};


export type QueryManagementGetEmployeeListArgs = {
  filter?: InputMaybe<OfficeUserFilter>;
};


export type QueryManagementGetEmployeeScheduleArgs = {
  arguments: QueryScheduleArgs;
};


export type QueryManagementInfoFieldGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManagementListEmployeeOfOrgChartArgs = {
  filter: UserSysOrgChartFilter;
};


export type QueryManagementOrgChartFullListArgs = {
  filter?: InputMaybe<OrgChartFullListFilter>;
  rootId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryManagementOrgChartListArgs = {
  filter?: InputMaybe<OrgChartFilter>;
};


export type QueryManagementOrgChartTreeArgs = {
  parentId?: Scalars['String']['input'];
};


export type QueryManagementPayrollGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManagementPayrollListArgs = {
  filter?: InputMaybe<PayrollListFilter>;
};


export type QueryManagementUserPaycheckGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManagementUserPaycheckListArgs = {
  filter?: InputMaybe<UserPaycheckListFilter>;
};


export type QueryManagementWarehouseAssetListArgs = {
  filter?: InputMaybe<ManagementWarehouseAssetFilter>;
};


export type QueryManagementWorkProfileExportArgs = {
  filter?: InputMaybe<ManagementWorkProfileFilter>;
};


export type QueryManagementWorkProfileGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManagementWorkProfileListArgs = {
  filter?: InputMaybe<ManagementWorkProfileFilter>;
};


export type QueryManagerApprovalFormGroupGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryManagerApprovalFormGroupListArgs = {
  filter?: InputMaybe<ApprovalFormGroupFilter>;
};


export type QueryNotificationGetListArgs = {
  filter?: InputMaybe<AppNotificationFilterArgs>;
};


export type QueryOfficeApprovalFilterGetArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOfficeApprovalFilterListArgs = {
  filter?: InputMaybe<ApprovalFilterListFilter>;
};


export type QueryOfficeApprovalFormGetListArgs = {
  filter?: InputMaybe<ApprovalFormFilter>;
};


export type QueryOfficeApprovalFormGroupListArgs = {
  filter?: InputMaybe<ApprovalFormGroupFilter>;
};


export type QueryOfficeApprovalGetFormArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeCarBookingGetScheduleArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeCarBookingGetScheduleListArgs = {
  filter?: InputMaybe<CarBookingScheduleFilter>;
};


export type QueryOfficeChatLinkPreviewArgs = {
  url: Scalars['String']['input'];
};


export type QueryOfficeChatMessageSearchArgs = {
  filter?: InputMaybe<OfficeChatMessageSearchArgs>;
};


export type QueryOfficeDocumentTagListArgs = {
  filter?: InputMaybe<DocumentTagFilterInput>;
};


export type QueryOfficeEmployeeFullOrgChartListArgs = {
  filter: UserOrgChartFilter;
};


export type QueryOfficeFetchCallTokenArgs = {
  callId: Scalars['String']['input'];
};


export type QueryOfficeGetActiveCarsArgs = {
  filter?: InputMaybe<OfficeActiveCarFilter>;
};


export type QueryOfficeGetApprovalArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeGetApprovalListArgs = {
  filter?: InputMaybe<ApprovalFilter>;
};


export type QueryOfficeGetApprovalPublicArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeGetBookingCarScheduleArgs = {
  filter: BookingCarFilter;
};


export type QueryOfficeGetCarsArgs = {
  filter?: InputMaybe<OfficeCarFilter>;
};


export type QueryOfficeGetMeetingDetailArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeGetMeetingScheduleArgs = {
  arguments: QueryBookingMeetingRoomArgs;
};


export type QueryOfficeGetNotificationCampaignListArgs = {
  filter?: InputMaybe<NotificationCampaignFilter>;
};


export type QueryOfficeGetTitlesArgs = {
  filter?: InputMaybe<OfficeTitleFilter>;
};


export type QueryOfficeLearningCertificateGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeLearningCertificateListArgs = {
  filter?: InputMaybe<LearningCertificateFilterInput>;
};


export type QueryOfficeLearningCourseGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeLearningCourseListArgs = {
  filter?: InputMaybe<LearningCourseFilterInput>;
};


export type QueryOfficeLearningLessonGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeLearningLessonListArgs = {
  filter?: InputMaybe<LearningLessonFilterInput>;
};


export type QueryOfficeLearningProjectGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeLearningProjectListArgs = {
  filter?: InputMaybe<LearningProjectFilterInput>;
};


export type QueryOfficeLearningSectionGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeLearningSectionListArgs = {
  filter?: InputMaybe<LearningSectionFilterInput>;
};


export type QueryOfficeLearningSkillGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeLearningSkillListArgs = {
  filter?: InputMaybe<LearningSkillFilterInput>;
};


export type QueryOfficeListEmployeeOfOrgChartArgs = {
  filter: UserOrgChartFilter;
};


export type QueryOfficeMeetingRoomGetListArgs = {
  arguments: QueryMeetingRoomsArgs;
};


export type QueryOfficeOrgChartListArgs = {
  filter?: InputMaybe<OrgChartFilter>;
};


export type QueryOfficePermissionBusinessRoleGetListArgs = {
  filter?: InputMaybe<PermissionBusinessRoleFilter>;
};


export type QueryOfficeSysUserGetListArgs = {
  filter?: InputMaybe<SysUserFilter>;
};


export type QueryOfficeTaskFilterGetArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOfficeTaskFilterListArgs = {
  filter?: InputMaybe<TaskFilterList>;
};


export type QueryOfficeTaskGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeTaskListArgs = {
  filter?: InputMaybe<TaskListFilter>;
};


export type QueryOfficeTaskReportConfigListArgs = {
  filter?: InputMaybe<TaskReportConfigList>;
};


export type QueryOfficeUserPaycheckGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeUserPaycheckListArgs = {
  filters: UserPaycheckListFilter;
};


export type QueryOfficeWikiCategoryListArgs = {
  filter?: InputMaybe<WikiCategoryFilterInput>;
};


export type QueryOfficeWikiGetArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeWikiListArgs = {
  filter?: InputMaybe<OfficeWikiFilter>;
};


export type QueryOfficeWorkProfileListArgs = {
  filter?: InputMaybe<OfficeWorkProfileFilter>;
};


export type QueryOrganizationGetByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryOrganizationGetByPhoneArgs = {
  phone: Scalars['String']['input'];
};


export type QueryProfileGetFieldsArgs = {
  blockId?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySteamGetListSaleArgs = {
  filter?: InputMaybe<OrganizationFilter>;
};


export type QueryWhitelistGetIPsArgs = {
  filter?: InputMaybe<WhitelistIPFilter>;
};

export type QueryBookingMeetingRoomArgs = {
  bookingStatus?: InputMaybe<RequestStatus>;
  case: CaseQueryMeeting;
  endAt: Scalars['Float']['input'];
  isAllRoom?: Scalars['Boolean']['input'];
  meetingRoomIds?: Array<Scalars['String']['input']>;
  orgChartId?: InputMaybe<Scalars['String']['input']>;
  startAt: Scalars['Float']['input'];
};

export type QueryMeetingRoomsArgs = {
  approvalFormId?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export type QueryScheduleArgs = {
  endAt: Scalars['Float']['input'];
  startAt: Scalars['Float']['input'];
  type?: ScheduleType;
};

export type RTMTokenResponse = {
  appId?: Maybe<Scalars['String']['output']>;
  rtmToken?: Maybe<Scalars['String']['output']>;
  tokenExpireAt?: Maybe<Scalars['Float']['output']>;
  uId?: Maybe<Scalars['Int']['output']>;
};

export enum RecordingStatus {
  FAIL = 'FAIL',
  RECORDING = 'RECORDING',
  SUCCESS = 'SUCCESS',
  UNKNOWN = 'UNKNOWN'
}

export enum RepeatedDay {
  Friday = 'Friday',
  Monday = 'Monday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  Thursday = 'Thursday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday'
}

export enum RequestStatus {
  Approved = 'Approved',
  Recalled = 'Recalled',
  Rejected = 'Rejected',
  UnderReview = 'UnderReview'
}

export enum RequesterRole {
  Admin = 'Admin',
  User = 'User'
}

export type ResponseBookingCarArgs = {
  bookingId: Scalars['String']['input'];
  isApprove: Scalars['Boolean']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export enum ScheduleType {
  Learning = 'Learning',
  Meeting = 'Meeting',
  Other = 'Other'
}

export enum ScheduleTypeColor {
  Learning = 'Learning',
  Meeting = 'Meeting',
  Other = 'Other'
}

export type SchedulesResponse = PagingData & {
  count: Scalars['Int']['output'];
  schedules?: Maybe<Array<UserSchedule>>;
  total: Scalars['Int']['output'];
};

export type ShoppingRequestArgs = {
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  expectedCost?: InputMaybe<Scalars['Float']['input']>;
  formFieldData?: InputMaybe<Scalars['JSON']['input']>;
  formId: Scalars['String']['input'];
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  submitType?: InputMaybe<ApprovalSubmitTypeEnum>;
  subscriberIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type StatementMenu = {
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentCode?: Maybe<Scalars['String']['output']>;
};

export type StatementPolicy = {
  actions?: Maybe<Array<Scalars['String']['output']>>;
  condition?: Maybe<Scalars['String']['output']>;
  effect?: Maybe<Scalars['String']['output']>;
  resources?: Maybe<Array<Scalars['String']['output']>>;
  service?: Maybe<Scalars['String']['output']>;
};

export type SysOrgChartFilter = {
  adminId?: InputMaybe<Scalars['String']['input']>;
  haveNoManager?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  orgType?: InputMaybe<GetOrgChartType>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type SysUserFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  orgChartId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ObjectStatus>;
};

export enum TableRowStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type TagDocument = {
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  no: Scalars['Float']['output'];
  status: ActiveStatus;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export enum TaskAction {
  Create = 'Create',
  Update = 'Update'
}

export type TaskCommentCreate = {
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  comment: Scalars['String']['input'];
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskId: Scalars['String']['input'];
};

export type TaskCommentUpdate = {
  comment: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export enum TaskComplete {
  All = 'All',
  In_Time = 'In_Time',
  Late = 'Late'
}

export type TaskCreateInput = {
  assignedId?: InputMaybe<Scalars['String']['input']>;
  assignedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** list id file dinh kem */
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  config?: InputMaybe<TaskReportConfigCreateInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  finishTime?: InputMaybe<Scalars['Float']['input']>;
  linkTaskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Do uu tien */
  priority?: InputMaybe<TaskPriority>;
  reporterId: Scalars['String']['input'];
  startTime?: InputMaybe<Scalars['Float']['input']>;
  /** Trang thai */
  status?: InputMaybe<TaskStatus>;
  taskType?: InputMaybe<TaskTypeEnum>;
  title: Scalars['String']['input'];
  watcherIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TaskFilterCreateInput = {
  filter?: InputMaybe<TaskFilterSave>;
  name?: InputMaybe<Scalars['String']['input']>;
  species?: InputMaybe<TaskSpeciesEnum>;
};

export type TaskFilterList = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  species?: InputMaybe<TaskSpeciesEnum>;
};

export type TaskFilterListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<OfficeFilter>>;
  total: Scalars['Int']['output'];
};

export type TaskFilterSave = {
  assignedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  complete?: InputMaybe<TaskComplete>;
  creatorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  excludeLinkedTaskId?: InputMaybe<Scalars['String']['input']>;
  finishTime?: InputMaybe<DatePeriod>;
  /** Null to get all */
  isLate?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  /** Do uu tien */
  priority?: InputMaybe<Array<TaskPriority>>;
  quickSearches?: InputMaybe<Array<TaskQuickSearchEnum>>;
  reportedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  species?: InputMaybe<TaskSpeciesEnum>;
  startTime?: InputMaybe<DatePeriod>;
  /** Trang thai */
  status?: InputMaybe<Array<TaskStatus>>;
  taskTypes?: InputMaybe<Array<TaskTypeEnum>>;
  templateTaskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  watchersIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TaskFilterUpdateInput = {
  filter?: InputMaybe<TaskFilterSave>;
  name?: InputMaybe<Scalars['String']['input']>;
  species?: InputMaybe<TaskSpeciesEnum>;
  taskFilterId?: InputMaybe<Scalars['String']['input']>;
};

export enum TaskKindEnum {
  ReportChild = 'ReportChild',
  ReportParent = 'ReportParent'
}

export type TaskListFilter = {
  assignedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  complete?: InputMaybe<TaskComplete>;
  creatorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  excludeLinkedTaskId?: InputMaybe<Scalars['String']['input']>;
  finishTime?: InputMaybe<DatePeriod>;
  /** Null to get all */
  isLate?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  /** Do uu tien */
  priority?: InputMaybe<Array<TaskPriority>>;
  quickSearches?: InputMaybe<Array<TaskQuickSearchEnum>>;
  reportedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  species?: InputMaybe<TaskSpeciesEnum>;
  startTime?: InputMaybe<DatePeriod>;
  /** Trang thai */
  status?: InputMaybe<Array<TaskStatus>>;
  taskTypes?: InputMaybe<Array<TaskTypeEnum>>;
  templateTaskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  watchersIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum TaskLogType {
  Comment = 'Comment',
  History = 'History'
}

export enum TaskPriority {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
  Undefined = 'Undefined'
}

export enum TaskQuickSearchEnum {
  ASSIGN_TO_ME = 'ASSIGN_TO_ME',
  IM_CREATED = 'IM_CREATED',
  IM_REPORT = 'IM_REPORT',
  IM_WATCHED = 'IM_WATCHED'
}

export type TaskReportConfigCreateInput = {
  customDays?: InputMaybe<Array<CustomDayTaskReportConfigInput>>;
  endAt?: InputMaybe<Scalars['Float']['input']>;
  /** Day end of work */
  endDay?: InputMaybe<Scalars['Int']['input']>;
  /** Month end of work */
  endMonth?: InputMaybe<Scalars['Int']['input']>;
  /** Week day end of work */
  endWeekDay?: InputMaybe<Scalars['Int']['input']>;
  monthDays?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodType?: CloneDatePeriodEnum;
  startAt?: InputMaybe<Scalars['Float']['input']>;
  startTimeIn?: InputMaybe<Scalars['IntOrAInt']['input']>;
  timeZone?: InputMaybe<Scalars['Float']['input']>;
  weekDays?: InputMaybe<Array<DayOfWeek>>;
  /** Number of working days */
  workDays?: InputMaybe<Scalars['Float']['input']>;
};

export type TaskReportConfigList = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export enum TaskSpeciesEnum {
  REPORT = 'REPORT',
  TASK = 'TASK'
}

export enum TaskStatus {
  Cancel = 'Cancel',
  Done = 'Done',
  In_progress = 'In_progress',
  Pending = 'Pending',
  Reject = 'Reject',
  Resolved = 'Resolved',
  Todo = 'Todo',
  Undefined = 'Undefined'
}

export type TaskStatusUpdateInput = {
  note?: InputMaybe<Scalars['String']['input']>;
  /** Trang thai */
  status: TaskStatus;
  taskId: Scalars['String']['input'];
};

export enum TaskTypeEnum {
  Report = 'Report',
  ReportArise = 'ReportArise',
  ReportConfig = 'ReportConfig',
  Task = 'Task'
}

export type TaskUpdateInput = {
  assignedId?: InputMaybe<Scalars['String']['input']>;
  assignedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** list id file dinh kem */
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  config?: InputMaybe<TaskReportConfigCreateInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  finishTime?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  linkTaskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Do uu tien */
  priority?: InputMaybe<TaskPriority>;
  reporterId?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Float']['input']>;
  /** Trang thai */
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  watcherIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ThumbnailParams = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileType: Scalars['String']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
};

export type ThumbnailPresignedUrlRes = {
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  presignedUrl: Scalars['String']['output'];
  size?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type UpdateBookingMeetingRoomArgs = {
  bookingId: Scalars['String']['input'];
  endAt: Scalars['Float']['input'];
  equiments?: Array<EquimentsForMettingRoom>;
  hostId: Scalars['String']['input'];
  logistics?: Array<LogisticsForMettingRoom>;
  meetingContent: Scalars['String']['input'];
  meetingRoomId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  notify?: InputMaybe<NotificationCampaignDifferentArgs>;
  organizationId: Scalars['String']['input'];
  participantIds?: InputMaybe<Array<Scalars['String']['input']>>;
  quantity: Scalars['Int']['input'];
  repeatConfig?: InputMaybe<BookMeetingRoomRepeatConfigInput>;
  /** legacy */
  repeatedDays?: InputMaybe<Array<RepeatedDay>>;
  /** legacy */
  repeatedEndAt?: InputMaybe<Scalars['Float']['input']>;
  scheduleId?: InputMaybe<Scalars['String']['input']>;
  startAt: Scalars['Float']['input'];
};

export type UpdateMeetingRoomArgs = {
  approvalFormId?: InputMaybe<Scalars['String']['input']>;
  capacity: Scalars['Int']['input'];
  color: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  status?: InputMaybe<ObjectStatus>;
};

export enum UpdateTypeEnum {
  Major = 'Major',
  Minor = 'Minor',
  Patch = 'Patch'
}

export type UploadFileArgs = {
  files?: InputMaybe<Array<GeneratePresignedUrlParams>>;
};

export type UpsertBlockArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertBlockResponse = {
  code?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type UpsertEmployeeDataArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpsertEmployeeDataResponse = {
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['JSON']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
};

export type UpsertEmployeeResponse = {
  accountHolder?: Maybe<Scalars['String']['output']>;
  accountNumber?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  bankBranch?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  departments?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  ward?: Maybe<Scalars['String']['output']>;
};

export type UpsertFieldArgs = {
  blockCode?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  dataType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  optionItems?: InputMaybe<Scalars['String']['input']>;
  required?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertFieldResponse = {
  blockCode?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  dataType?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  optionItems?: Maybe<Scalars['String']['output']>;
  required?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type UpsertOrgChartArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertOrgChartResponse = {
  code?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentCode?: Maybe<Scalars['String']['output']>;
};

export type UpsertTitleArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertTitleResponse = {
  code?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type User = {
  address?: Maybe<Address>;
  avatar?: Maybe<File>;
  backIdCard?: Maybe<File>;
  bankAccount?: Maybe<BankAccount>;
  bankAccounts?: Maybe<Array<BankAccount>>;
  businessRoles?: Maybe<Array<BusinessRole>>;
  carriers?: Maybe<Array<Carrier>>;
  configuration?: Maybe<Configuration>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  dateOfBirth?: Maybe<Scalars['Float']['output']>;
  desiredDistance?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  extendId?: Maybe<Scalars['String']['output']>;
  frontIdCard?: Maybe<File>;
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  images?: Maybe<Array<File>>;
  isCheckDeviceValidated?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  officeUser?: Maybe<OfficeUser>;
  organizationDevices?: Maybe<Array<OrganizationDevice>>;
  phone?: Maybe<Scalars['String']['output']>;
  phones?: Maybe<Array<Scalars['String']['output']>>;
  profileVerified: Scalars['Boolean']['output'];
  requestId?: Maybe<Scalars['String']['output']>;
  sessionBusinessRole?: Maybe<BusinessRole>;
  sessionMultiBusinessRoles?: Maybe<Array<BusinessRole>>;
  taxNumber?: Maybe<Scalars['String']['output']>;
  unreadNotificationCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserAddress = {
  address?: Maybe<Scalars['String']['output']>;
  addressType?: Maybe<AddressType>;
  addressZoneId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  districtId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  provinceId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  ward?: Maybe<Scalars['String']['output']>;
  wardId?: Maybe<Scalars['String']['output']>;
};

export type UserBankAccount = {
  accountHolder?: Maybe<Scalars['String']['output']>;
  accountNumber?: Maybe<Scalars['String']['output']>;
  bankBranch?: Maybe<Scalars['String']['output']>;
  bankId?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  cardNumber?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type UserCheckInArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  placeId?: InputMaybe<Scalars['String']['input']>;
  secret?: InputMaybe<Scalars['String']['input']>;
};

export type UserDepartment = {
  department?: Maybe<OfficeOrgChart>;
  title?: Maybe<OfficeTitle>;
};

export type UserDocumentPermissionInput = {
  allowUserIds?: InputMaybe<Array<Scalars['String']['input']>>;
  denyUserIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UserDocumentPermissionItemResponse = {
  department?: Maybe<OfficeOrgChart>;
  users?: Maybe<Array<OfficeUser>>;
};

export type UserDocumentPermissionResponse = {
  allows?: Maybe<Array<UserDocumentPermissionItemResponse>>;
  denys?: Maybe<Array<UserDocumentPermissionItemResponse>>;
};

export type UserInfo = {
  businessRole?: Maybe<BusinessRole>;
  businessRoleId?: Maybe<Scalars['String']['output']>;
  businessRoleIds?: Maybe<Array<Scalars['String']['output']>>;
  businessRoles?: Maybe<Array<BusinessRole>>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type UserListDepartment = {
  l1?: Maybe<Scalars['String']['output']>;
  l2?: Maybe<Scalars['String']['output']>;
  l3?: Maybe<Scalars['String']['output']>;
  l4?: Maybe<Scalars['String']['output']>;
  l5?: Maybe<Scalars['String']['output']>;
  l6?: Maybe<Scalars['String']['output']>;
  l7?: Maybe<Scalars['String']['output']>;
  l8?: Maybe<Scalars['String']['output']>;
};

export type UserLoginArgs = {
  identifierForVendor?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UserOrgChartFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  notResigned?: InputMaybe<Scalars['Boolean']['input']>;
  onlyActive?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<OrderUserBy>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type UserPasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type UserPaycheckBulkResponse = {
  code?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  month?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payrollCode?: Maybe<Scalars['String']['output']>;
  userCode?: Maybe<Scalars['String']['output']>;
  wage?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type UserPaycheckBulkUpsertInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payrollCode?: InputMaybe<Scalars['String']['input']>;
  userCode?: InputMaybe<Scalars['String']['input']>;
  wage?: InputMaybe<Scalars['Float']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UserPaycheckBulkUpsertResponse = {
  records?: Maybe<Array<UserPaycheckBulkResponse>>;
};

export type UserPaycheckCommentCreate = {
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  comment?: InputMaybe<Scalars['String']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  paycheckId: Scalars['String']['input'];
};

export type UserPaycheckCreateInput = {
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  month: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  payrollId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  wage: Scalars['Float']['input'];
  year: Scalars['Int']['input'];
};

export type UserPaycheckListFilter = {
  createdDate?: InputMaybe<DatePeriod>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
  orgChartIds?: InputMaybe<Array<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paycheckId?: InputMaybe<Scalars['String']['input']>;
  payrollId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  statuses?: InputMaybe<Array<PaycheckStatus>>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UserPaycheckListResponse = PagingData & {
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  userPaychecks?: Maybe<Array<OfficeUserPaycheck>>;
};

export type UserPaycheckUpdateInput = {
  id: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payrollId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PaycheckStatus>;
  userId?: InputMaybe<Scalars['String']['input']>;
  wage?: InputMaybe<Scalars['Float']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UserResponse = {
  accessToken?: Maybe<Scalars['String']['output']>;
  avaiableBusinessRoles?: Maybe<Array<BusinessRole>>;
  loggedInTime?: Maybe<Scalars['Float']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UserSchedule = {
  color?: Maybe<ScheduleTypeColor>;
  endAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  learnStudent?: Maybe<LearnStudent>;
  meeting?: Maybe<BookingMeetingRoom>;
  startAt?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ScheduleType>;
};

export type UserSysOrgChartFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  notResigned?: InputMaybe<Scalars['Boolean']['input']>;
  onlyActive?: InputMaybe<Scalars['Boolean']['input']>;
  orgType?: InputMaybe<GetOrgChartType>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type UserWorkProfile = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  detail?: Maybe<UserWorkProfileDetail>;
  id?: Maybe<Scalars['String']['output']>;
  info?: Maybe<UserWorkProfileInfo>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<OfficeUser>;
};

export type UserWorkProfileDetail = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  department?: Maybe<OfficeOrgChart>;
  id: Scalars['String']['output'];
  infoBlocks?: Maybe<Array<InfoBlock>>;
  leader?: Maybe<OfficeUser>;
  major?: Maybe<Scalars['String']['output']>;
  title?: Maybe<OfficeTitle>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  userCode?: Maybe<Scalars['String']['output']>;
  workProfile?: Maybe<UserWorkProfile>;
};

export type UserWorkProfileInfo = {
  actionType?: Maybe<WorkProfileAction>;
  activeDate?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<File>>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  decidedDate?: Maybe<Scalars['Float']['output']>;
  decidedNumber?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  isDecided?: Maybe<Scalars['Boolean']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  type?: Maybe<WorkProfileChangeType>;
  typeTitle?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  workProfile?: Maybe<UserWorkProfile>;
};

export type VerifyOxiiPhoneNumberRes = {
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type VersionWiki = {
  approval?: Maybe<OfficeApproval>;
  attachments?: Maybe<Array<File>>;
  categories?: Maybe<Array<CategoryWiki>>;
  code?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<OfficeLogs>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isLatestVersion?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  lastVersion?: Maybe<VersionWiki>;
  name?: Maybe<Scalars['String']['output']>;
  no?: Maybe<Scalars['Float']['output']>;
  status: VersionWikiStatus;
  tags?: Maybe<Array<TagDocument>>;
  thumbnails?: Maybe<Array<File>>;
  updateType?: Maybe<UpdateTypeEnum>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  userCreator?: Maybe<OfficeUser>;
  version?: Maybe<Scalars['String']['output']>;
  versionRevert?: Maybe<VersionWiki>;
  versionTitle?: Maybe<Scalars['String']['output']>;
  wiki?: Maybe<DocumentWiki>;
};

export type VersionWikiCommentCreateInput = {
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  comment?: InputMaybe<Scalars['String']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  versionWikiId: Scalars['String']['input'];
};

export enum VersionWikiStatus {
  Approved = 'Approved',
  Draft = 'Draft',
  Pending = 'Pending',
  Recalled = 'Recalled',
  Rejected = 'Rejected',
  UnderReview = 'UnderReview'
}

export type WarehouseAsset = {
  assets?: Maybe<Array<Asset>>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  orgChart?: Maybe<OfficeOrgChart>;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type WarehouseAssetListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<WarehouseAsset>>;
  total: Scalars['Int']['output'];
};

export type WhitelistAddIpResponse = {
  existedCount: Scalars['Int']['output'];
  existedIPs?: Maybe<Array<Scalars['String']['output']>>;
  insertedCount: Scalars['Int']['output'];
  insertedIPs?: Maybe<Array<WhitelistIP>>;
  total: Scalars['Int']['output'];
};

export type WhitelistIP = {
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  publicIp: Scalars['String']['output'];
  type: IPVersion;
  updatedAt: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type WhitelistIPFilter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type WhitelistIPResponse = PagingData & {
  count: Scalars['Int']['output'];
  publicIps?: Maybe<Array<WhitelistIP>>;
  total: Scalars['Int']['output'];
};

export type WhitelistRemoveIpResponse = {
  removedCount: Scalars['Int']['output'];
  removedIPs?: Maybe<Array<WhitelistIP>>;
  total: Scalars['Int']['output'];
};

export type WikiCategoryCreateInput = {
  name: Scalars['String']['input'];
};

export type WikiCategoryFilterInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type WikiCategoryUpdateInput = {
  categoryWikiId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type WikiCategoryUpsertInput = {
  categoryWikiId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type WikiCommentCreateInput = {
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  comment?: InputMaybe<Scalars['String']['input']>;
  imageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  wikiId: Scalars['String']['input'];
};

export type WikiCopyCreateInput = {
  folderIds: Scalars['String']['input'];
  wikiId: Scalars['String']['input'];
};

export type WikiCreateInput = {
  approvalArgs?: InputMaybe<ApprovalArgs>;
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  categoryWikiIds?: InputMaybe<Array<Scalars['String']['input']>>;
  code?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  folderId: Scalars['String']['input'];
  important?: InputMaybe<WikiImportant>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<UserDocumentPermissionInput>;
  status?: InputMaybe<VersionWikiStatus>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnailIds?: InputMaybe<Array<Scalars['String']['input']>>;
  versionDraftId?: InputMaybe<Scalars['String']['input']>;
  versionRevertId?: InputMaybe<Scalars['String']['input']>;
};

export enum WikiImportant {
  Common = 'Common',
  Important = 'Important'
}

export type WikiInfoUpdateInput = {
  categoryWikiIds?: InputMaybe<Array<Scalars['String']['input']>>;
  important?: InputMaybe<WikiImportant>;
  permissions?: InputMaybe<UserDocumentPermissionInput>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  wikiId: Scalars['String']['input'];
};

export type WikiMoveInput = {
  folderId: Scalars['String']['input'];
  wikiId: Scalars['String']['input'];
};

export type WikiNewVersionCreateInput = {
  approvalArgs?: InputMaybe<ApprovalArgs>;
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  code?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<UserDocumentPermissionInput>;
  status?: InputMaybe<VersionWikiStatus>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnailIds?: InputMaybe<Array<Scalars['String']['input']>>;
  updateType?: InputMaybe<UpdateTypeEnum>;
  versionDraftId?: InputMaybe<Scalars['String']['input']>;
  versionRevertId?: InputMaybe<Scalars['String']['input']>;
  wikiId: Scalars['String']['input'];
};

export type WikiNewVersionRevertInput = {
  updateType?: InputMaybe<UpdateTypeEnum>;
  versionRevertId: Scalars['String']['input'];
};

export type WikiSetImportantInput = {
  important?: InputMaybe<WikiImportant>;
  wikiId: Scalars['String']['input'];
};

export enum WikiStatus {
  Active = 'Active',
  Draft = 'Draft',
  Inactive = 'Inactive'
}

export type WikiUpdateInput = {
  approvalArgs?: InputMaybe<ApprovalArgs>;
  approvalId?: InputMaybe<Scalars['String']['input']>;
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  categoryWikiIds?: InputMaybe<Array<Scalars['String']['input']>>;
  code?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  folderId: Scalars['String']['input'];
  important?: InputMaybe<WikiImportant>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<UserDocumentPermissionInput>;
  status?: InputMaybe<VersionWikiStatus>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnailIds?: InputMaybe<Array<Scalars['String']['input']>>;
  versionDraftId?: InputMaybe<Scalars['String']['input']>;
  versionRevertId?: InputMaybe<Scalars['String']['input']>;
  versionWikiId?: InputMaybe<Scalars['String']['input']>;
  wikiId: Scalars['String']['input'];
};

export enum WorkProfileAction {
  Create = 'Create',
  Remove = 'Remove',
  Update = 'Update'
}

export type WorkProfileBulkUpsertInput = {
  /** Ngày hiệu lực */
  activeDate: Scalars['String']['input'];
  /** Có quyết định */
  decided?: InputMaybe<Scalars['String']['input']>;
  /** Ngày quyết định */
  decidedDate?: InputMaybe<Scalars['String']['input']>;
  /** Số quyết định */
  decidedNumber?: InputMaybe<Scalars['String']['input']>;
  /** Phòng ban */
  department?: InputMaybe<Scalars['String']['input']>;
  /** Ngày kết thúc */
  endDate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  /** Quản lý trực tiếp */
  leader?: InputMaybe<Scalars['String']['input']>;
  /** Ngạch bậc */
  major?: InputMaybe<Scalars['String']['input']>;
  metadata: Scalars['JSON']['input'];
  /** Ghi chú */
  note?: InputMaybe<Scalars['String']['input']>;
  /** Lý do thay đổi */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** Chức danh */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Hình thức thay đổi */
  typeText: Scalars['String']['input'];
  /** Mã nhân viên */
  userCode?: InputMaybe<Scalars['String']['input']>;
  /** Nhân viên */
  userCodeUpdate?: InputMaybe<Scalars['String']['input']>;
};

export type WorkProfileBulkUpsertRecordResponse = {
  /** Ngày hiệu lực */
  activeDate: Scalars['String']['output'];
  /** Có quyết định */
  decided?: Maybe<Scalars['String']['output']>;
  /** Ngày quyết định */
  decidedDate?: Maybe<Scalars['String']['output']>;
  /** Số quyết định */
  decidedNumber?: Maybe<Scalars['String']['output']>;
  /** Phòng ban */
  department?: Maybe<Scalars['String']['output']>;
  /** Ngày kết thúc */
  endDate?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  /** Quản lý trực tiếp */
  leader?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  /** Chức danh */
  title?: Maybe<Scalars['String']['output']>;
  /** Hình thức thay đổi */
  typeText: Scalars['String']['output'];
  /** Mã nhân viên */
  userCode?: Maybe<Scalars['String']['output']>;
  /** Nhân viên */
  userCodeUpdate?: Maybe<Scalars['String']['output']>;
};

export type WorkProfileBulkUpsertResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<WorkProfileBulkUpsertRecordResponse>>;
  total: Scalars['Int']['output'];
};

export enum WorkProfileChangeType {
  Appointment = 'Appointment',
  ChangeImmediateSuperior = 'ChangeImmediateSuperior',
  ChangeOfOrganizationalStructure = 'ChangeOfOrganizationalStructure',
  ChangeOfTitle = 'ChangeOfTitle',
  CurrentlyWorking = 'CurrentlyWorking',
  Demotion = 'Demotion',
  Dismissal = 'Dismissal',
  NewRecruitment = 'NewRecruitment',
  NotUsedForRecruitment = 'NotUsedForRecruitment',
  Official = 'Official',
  ProbationaryAppointment = 'ProbationaryAppointment',
  Quitting = 'Quitting',
  QuittingTransfer = 'QuittingTransfer',
  Removal = 'Removal',
  ReturnToWork = 'ReturnToWork',
  SuspendLaborContract = 'SuspendLaborContract',
  TemporaryTransfer = 'TemporaryTransfer',
  Transfer = 'Transfer',
  TransferCompany = 'TransferCompany'
}

export type WorkProfileCreateInput = {
  /** Ngày hiệu lực */
  activeDate: Scalars['Float']['input'];
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Ngày quyết định */
  decidedDate?: InputMaybe<Scalars['Float']['input']>;
  /** Số quyết định */
  decidedNumber?: InputMaybe<Scalars['String']['input']>;
  /** Phòng ban */
  departmentId?: InputMaybe<Scalars['String']['input']>;
  /** Ngày het han */
  endDate?: InputMaybe<Scalars['Float']['input']>;
  /** Có quyết định */
  isDecided: Scalars['Boolean']['input'];
  /** Quản lý trực tiếp */
  leaderId?: InputMaybe<Scalars['String']['input']>;
  /** Ngạch bậc */
  major?: InputMaybe<Scalars['String']['input']>;
  metadata: Scalars['JSON']['input'];
  /** Ghi chú */
  note?: InputMaybe<Scalars['String']['input']>;
  /** Lý do thay đổi */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** Chức danh */
  titleId?: InputMaybe<Scalars['String']['input']>;
  /** Hình thức thay đổi */
  type: WorkProfileChangeType;
  /** Mã nhân viên */
  userCode?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type WorkProfileInfoType = {
  key?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<WorkProfileAction>;
};

export type WorkProfileListResponse = PagingData & {
  count: Scalars['Int']['output'];
  records?: Maybe<Array<UserWorkProfile>>;
  total: Scalars['Int']['output'];
};

export type WorkProfileUpdateInput = {
  /** Ngày hiệu lực */
  activeDate: Scalars['Float']['input'];
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Ngày quyết định */
  decidedDate?: InputMaybe<Scalars['Float']['input']>;
  /** Số quyết định */
  decidedNumber?: InputMaybe<Scalars['String']['input']>;
  /** Phòng ban */
  departmentId?: InputMaybe<Scalars['String']['input']>;
  /** Ngày het han */
  endDate?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  /** Có quyết định */
  isDecided?: InputMaybe<Scalars['Boolean']['input']>;
  /** Quản lý trực tiếp */
  leaderId?: InputMaybe<Scalars['String']['input']>;
  /** Ngạch bậc */
  major?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  /** Ghi chú */
  note?: InputMaybe<Scalars['String']['input']>;
  /** Lý do thay đổi */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** Chức danh */
  titleId?: InputMaybe<Scalars['String']['input']>;
  /** Hình thức thay đổi */
  type?: InputMaybe<WorkProfileChangeType>;
  /** Mã nhân viên */
  userCode?: InputMaybe<Scalars['String']['input']>;
};

export enum WorkShiftOutOfTimePunishment {
  Fixed = 'Fixed',
  FollowTime = 'FollowTime',
  Late = 'Late',
  Pass = 'Pass'
}

export enum YourActionEnum {
  Approve = 'Approve',
  Consent = 'Consent',
  Waiting = 'Waiting'
}
