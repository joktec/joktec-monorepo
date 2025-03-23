import { beforeEach, describe, expect, it } from '@jest/globals';
import { sleep } from '@joktec/utils';
import { Test } from '@nestjs/testing';
import { JwtService } from '../jwt.service';
import { ConfigService } from '../../config';
import { JwtPayload, JwtToken } from '../jwt.model';
import jwt from 'jsonwebtoken';
import { JwtConfig } from '../jwt.config';
import { UnauthorizedException } from '../../../exceptions';

describe('JwtService class', () => {
  let configService: ConfigService;
  let jwtService: JwtService;
  let jwtConfig: JwtConfig;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [JwtService, ConfigService],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    jwtConfig = new JwtConfig(configService.get('guard'));
  });

  describe('extractToken method', () => {
    it('should throw an exception if authorization header is not found', async () => {
      const req = { headers: {} } as any;
      await expect(jwtService.extractToken(req)).rejects.toThrow(UnauthorizedException);
      await expect(jwtService.extractToken(req)).rejects.toThrow('AUTHORIZATION_HEADER_NOT_FOUND');
    });

    it('should throw an exception if token format is invalid', async () => {
      const req = { headers: { authorization: 'invalid-token' } } as any;
      await expect(jwtService.extractToken(req)).rejects.toThrow(UnauthorizedException);
      await expect(jwtService.extractToken(req)).rejects.toThrow('INVALID_TOKEN_FORMAT');
    });

    it('should return the token if it is valid', async () => {
      const req = { headers: { authorization: 'Bearer valid-token' } } as any;
      const token = await jwtService.extractToken(req);
      expect(token).toBe('valid-token');
    });
  });

  describe('sign method', () => {
    it('should return a valid token', async () => {
      const payload: JwtPayload = { userId: 'user-id' };
      const token: JwtToken = await jwtService.sign(payload);
      expect(token.accessToken).toBeDefined();
      expect(token.refreshToken).toBeDefined();
      expect(token.expiredAt).toBeDefined();
    });
  });

  describe('verify method', () => {
    it('should throw an exception if token is expired', async () => {
      const payload: JwtPayload = { userId: 'user-id' };
      const token: string = jwt.sign(payload, jwtConfig.secretKey, { expiresIn: 0 });
      await sleep(100);
      await expect(jwtService.verify(token)).rejects.toThrow(UnauthorizedException);
      await expect(jwtService.verify(token)).rejects.toThrow('TOKEN_EXPIRED');
    });

    it('should throw an exception if token is invalid', async () => {
      const token = 'invalid-token';
      await expect(jwtService.verify(token)).rejects.toThrow(UnauthorizedException);
      await expect(jwtService.verify(token)).rejects.toThrow('INVALID_TOKEN');
    });

    it('should return a valid payload if token is valid', async () => {
      const payload: JwtPayload = { userId: 'user-id' };
      const token: string = (await jwtService.sign(payload)).accessToken;
      const verifiedPayload: JwtPayload = await jwtService.verify(token);
      expect(verifiedPayload.userId).toBe('user-id');
    });
  });

  describe('verifyRefreshToken method', () => {
    it('should throw an exception if token is invalid', async () => {
      const token = 'invalid-token';
      await expect(jwtService.verifyRefreshToken(token)).rejects.toThrow(UnauthorizedException);
      await expect(jwtService.verifyRefreshToken(token)).rejects.toThrow('INVALID_TOKEN');
    });

    it('should return the decoded payload for a valid refresh token', async () => {
      const payload: JwtPayload = { userId: 'user-id' };
      const refreshToken = jwt.sign(payload, jwtConfig.refreshKey, { expiresIn: '1d' });
      const refreshPayload: JwtPayload = await jwtService.verifyRefreshToken(refreshToken);
      expect(refreshPayload.userId).toBe('user-id');
      expect(refreshPayload.iat).toBeDefined();
    });

    it('should throw an error for an invalid refresh token', async () => {
      const invalidToken = 'invalid_token';
      await expect(jwtService.verifyRefreshToken(invalidToken)).rejects.toThrow(UnauthorizedException);
    });
  });
});
