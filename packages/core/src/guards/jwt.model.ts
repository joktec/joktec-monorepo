import jwt from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;

  [key: string]: any;
}

export interface JwtToken {
  accessToken: string;
  refreshToken: string;
  expiredAt: Date;
}
