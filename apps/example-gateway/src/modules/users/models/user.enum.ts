export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
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

export enum AuthPlatform {
  PHONE = 'phone',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export enum UserAction {
  GRANT = 'grant',
  DENY = 'deny',
  BLOCK = 'block',
}
