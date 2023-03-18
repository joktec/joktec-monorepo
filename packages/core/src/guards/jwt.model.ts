import jwt from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  userId: string;
  email?: string;
}

export interface JwtToken {
  token: string;
  expiredAt: Date;
}

export interface JwtUser {
  id: string;
  email: string;

  [key: string]: any;
}
