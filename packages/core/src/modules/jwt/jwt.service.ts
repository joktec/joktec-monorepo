import { Injectable } from '@nestjs/common';
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import moment from 'moment';
import ms from 'ms';
import { ExceptionMessage, InternalServerException, UnauthorizedException } from '../../exceptions';
import { ExpressRequest } from '../../models';
import { ConfigService } from '../config';
import { JwtConfig } from './jwt.config';
import { JwtPayload, JwtToken } from './jwt.model';

@Injectable()
export class JwtService {
  private readonly config: JwtConfig;

  constructor(private configService: ConfigService) {
    this.config = this.configService.parseOrThrow(JwtConfig, 'jwt');
  }

  async extractToken(req: ExpressRequest): Promise<string> {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException(ExceptionMessage.AUTHORIZATION_HEADER_NOT_FOUND);

    const [prefix, token] = authHeader.split(' ');
    if (prefix !== 'Bearer' || !token) throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN_FORMAT);
    return token;
  }

  async sign(payload: JwtPayload): Promise<JwtToken> {
    const { secretKey, refreshKey, expired } = this.config;
    const expiresIn: number = ms(expired) / 1000;

    const accessPayload: JwtPayload = { type: 'ACCESS', ...payload };
    const jwtToken: JwtToken = {
      accessToken: jwt.sign(accessPayload, secretKey, { expiresIn }),
      expiredAt: moment().add(expiresIn, 'seconds').toDate(),
    };

    if (refreshKey) {
      const refreshPayload: JwtPayload = { type: 'REFRESH', ...payload };
      jwtToken.refreshToken = jwt.sign(refreshPayload, refreshKey, { expiresIn: expiresIn * 2 });
    }

    return jwtToken;
  }

  async verify(token: string): Promise<JwtPayload> {
    try {
      const res = jwt.verify(token, this.config.secretKey, { complete: true });
      return res.payload as JwtPayload;
    } catch (err) {
      this.handleError(err);
    }
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    if (!this.config.refreshKey) {
      throw new InternalServerException(ExceptionMessage.REFRESH_TOKEN_NOT_SETUP);
    }

    try {
      const res = jwt.verify(token, this.config.refreshKey, { ignoreExpiration: true, complete: true });
      return res.payload as JwtPayload;
    } catch (err) {
      this.handleError(err);
    }
  }

  async decode(token: string): Promise<JwtPayload> {
    try {
      const res = jwt.decode(token, { complete: true });
      return res.payload as JwtPayload;
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: any) {
    if (err instanceof TokenExpiredError) {
      const data = { name: err.name, message: err.message, expiredAt: err.expiredAt };
      throw new UnauthorizedException(ExceptionMessage.TOKEN_EXPIRED, data);
    }

    if (err instanceof NotBeforeError) {
      const data = { name: err.name, message: err.message, notBefore: err.date };
      throw new UnauthorizedException(ExceptionMessage.TOKEN_EXPIRED, data);
    }

    if (err instanceof JsonWebTokenError) {
      throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN, { name: err.name, message: err.message });
    }

    throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN, err.inner || err);
  }
}
