import jwt from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;

  [key: string]: any;
}

export interface JwtToken {
  accessToken: string;
  expiredAt: Date;
  refreshToken?: string;
}
