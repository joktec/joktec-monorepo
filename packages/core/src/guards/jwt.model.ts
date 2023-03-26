import jwt from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  userId: string;
  email?: string;
}

export interface JwtToken {
  accessToken: string;
  refreshToken: string;
  expiredAt: Date;
}
