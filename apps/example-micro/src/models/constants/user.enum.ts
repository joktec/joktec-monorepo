export enum UserRole {
  NORMAL = 'normal',
  KOL = 'kol',
  BIZ = 'biz',
}

export enum UserGender {
  UNKNOWN = 'unknown',
  MALE = 'male',
  FEMALE = 'female',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVATED = 'activated',
  DISABLED = 'disabled',
}

export enum UserBizType {
  DEFAULT = 'default',
  AUDITION = 'audition',
  AGENCY = 'agency',
  ENTERTAINMENT = 'entertainment',
}

export enum UserBizStatus {
  WAITING = 'waiting',
  APPROVED = 'approved',
  REJECT = 'reject',
}

export enum UserConfigNotifyType {
  CREDIT = 'credit',
  MESSAGE = 'message',
  CONNECT = 'connect',
  COMMENT = 'comment',
  NEWS = 'news',
}

export enum UserAddressType {
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}
