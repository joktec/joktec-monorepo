import jwt from 'jsonwebtoken';

export type JwtType = 'ACCESS' | 'REFRESH';

export interface JwtPayload extends jwt.JwtPayload {
  /**
   * (Issuer) Claim: Identifies the principal that issued the JWT.
   */
  iss?: string;

  /**
   * (Subject) Claim: Identifies the principal that is the subject of the JWT.
   */
  sub?: string;

  /**
   * (Audience) Claim: Identifies the recipients that the JWT is intended for.
   */
  aud?: string | string[];

  /**
   * (Expiration Time) Claim: Identifies the expiration time on or after which the JWT must not be accepted for processing.
   */
  exp?: number;

  /**
   * (Not Before) Claim: Identifies the time before which the JWT must not be accepted for processing.
   */
  nbf?: number;

  /**
   * (Issued At) Claim: Identifies the time at which the JWT was issued.
   */
  iat?: number;

  /**
   * (JWT ID) Claim: Provides a unique identifier for the JWT.
   */
  jti?: string;

  /**
   * (JWT Type) Detect access token or refresh token
   */
  type?: JwtType;

  [key: string]: any;
}

export interface JwtToken {
  accessToken: string;
  expiredAt: Date;
  refreshToken?: string;
}
