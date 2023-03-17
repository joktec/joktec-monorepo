import jwt from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {}

export interface JwtToken {
  token: string;
  expiredAt: Date;
}

export interface JwtUser {
  [key: string]: any;

  token: string;
  userId: string;
  email: string;
}
