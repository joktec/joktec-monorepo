import { Injectable } from '@nestjs/common';
import { JwtConfig } from './jwt.config';
import { ConfigService } from '../config';
import { ExceptionMessage, UnauthorizedException } from '../exceptions';
import { JwtPayload, JwtToken } from './jwt.model';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import moment from 'moment';
import { Request } from 'express';

@Injectable()
export class JwtService {
  private readonly config: JwtConfig;

  constructor(private configService: ConfigService) {
    this.config = new JwtConfig(this.configService.get('guard'));
  }

  async extractToken(req: Request): Promise<string> {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException(ExceptionMessage.AUTHORIZATION_HEADER_NOT_FOUND);

    const [prefix, token] = authHeader.split(' ');
    if (prefix !== 'Bearer' || !token) throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN_FORMAT);
    return token;
  }

  async sign(payload: JwtPayload): Promise<JwtToken> {
    const expiresIn: number = ms(this.config.expired) / 1000;
    return {
      accessToken: jwt.sign(payload, this.config.secretKey, { expiresIn }),
      refreshToken: jwt.sign(payload, this.config.refreshKey, { expiresIn: expiresIn * 2 }),
      expiredAt: moment().add(expiresIn, 'seconds').toDate(),
    };
  }

  async verify(token: string): Promise<JwtPayload> {
    try {
      const res = jwt.verify(token, this.config.secretKey, { complete: true });
      const payload = res.payload as JwtPayload;
      return { ...payload, userId: payload.userId || payload.sub } as JwtPayload;
    } catch (err) {
      if (err.name === 'TokenExpiredError') throw new UnauthorizedException(ExceptionMessage.TOKEN_EXPIRED);
      if (err.name === 'NotBeforeError') throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN_FORMAT);
      throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN, err);
    }
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const res = jwt.verify(token, this.config.refreshKey, { ignoreExpiration: true, complete: true });
      const payload = res.payload as JwtPayload;
      return { ...payload, userId: payload.userId || payload.sub } as JwtPayload;
    } catch (err) {
      throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN, err);
    }
  }

  async decode(token: string): Promise<JwtPayload> {
    try {
      const res = jwt.decode(token, { complete: true });
      const payload = res.payload as JwtPayload;
      return { ...payload, userId: payload.userId || payload.sub } as JwtPayload;
    } catch (err) {
      throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN, err);
    }
  }
}
