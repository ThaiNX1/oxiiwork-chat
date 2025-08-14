export enum ContentMessageType {
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
    FILE = 'file',
}

export enum MessageType {
    CUSTOMER = 1,
    SYSTEM = 0,
}

export enum CalendarType {
    Day = 'day',
    Week = 'week',
    Month = 'month',
    All = 'all'
}

export enum CalendarPosition {
    Left = 'left',
    Right = 'right',
}

export enum CarBookingType {
    ALL = 'all',
    SELF = 'self',
}

export enum BusinessRole {
    ADMINISTRATOR = 'ADMINISTRATOR',
}

export enum ControlType {
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    SELECT = 'SELECT',
    MULTI_SELECT = 'MULTI_SELECT',
    DATE = 'DATE',
    DATE_TIME = 'DATE_TIME',
    DATE_RANGE = 'DATE_RANGE',
}

export enum LoginType {
    LOGIN = 'login',
    EMAIL = 'email',
    UPDATE_PASSWORD = 'update_password',
    FORGOT_PASSWORD = 'forgot_password',
    OTP = 'otp',
}

export enum ResponseCode {
  Success = 200,
  Expired_Token_Facebook = 4011,
  Expired_Token = 401,
}

export enum DialogImageViewerType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
}

export enum NumberValue {
  MAX_VALUE = 2147483647,
}

export enum NotificationType {
  CHAT_RECEIVED = 'message:received',
  CHAT_NOTI = 'chat.notify',
  APPROVAL_SUBMIT = 'approval.submitted',
}

export enum RoleApproveCreate {
  Approve = 'Approve',
  Consent = 'Consent'
}
