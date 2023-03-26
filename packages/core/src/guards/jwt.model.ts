import jwt from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;

  userId: string;
  email?: string;
}

export interface JwtToken {
  accessToken: string;
  refreshToken: string;
  expiredAt: Date;
}
