import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtConfig } from './jwt.config';
import { ConfigService } from '../config';
import { UnauthorizedException } from '../exceptions';
import { JwtPayload, JwtToken } from './jwt.model';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import moment from 'moment';

@Injectable()
export class JwtService implements OnModuleInit {
  private config: JwtConfig;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    if (this.config) return;
    this.config = this.configService.get<JwtConfig>('guard');
  }

  async sign(payload: JwtPayload): Promise<JwtToken> {
    const expiresIn = ms(this.config.expired) / 1000;
    return {
      token: jwt.sign(payload, this.config.secretKey, { expiresIn }),
      expiredAt: moment().add(expiresIn, 'seconds').toDate(),
    };
  }

  async verify(token: string): Promise<JwtPayload> {
    try {
      const result = jwt.verify(token, this.config.secretKey, { complete: true });
      return result.payload as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException('INVALID_TOKEN');
    }
  }
}
