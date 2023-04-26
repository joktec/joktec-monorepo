import { beforeEach, describe, expect, it } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { JwtGuard } from '../jwt.guard';
import { JwtService } from '../jwt.service';
import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '../../config';

describe('JwtGuard class', () => {
  let guard: JwtGuard;
  let jwtService: JwtService;
  let mockToken: string = 'mockToken';

  beforeEach(async () => {
    new ConfigService();
    const moduleRef = await Test.createTestingModule({
      providers: [JwtGuard, JwtService, ConfigService],
    }).compile();

    guard = moduleRef.get<JwtGuard>(JwtGuard);
    jwtService = moduleRef.get<JwtService>(JwtService);

    const token = await jwtService.sign({
      sub: 'mockUserId',
      userId: 'mockUserId',
    });
    mockToken = token.accessToken;
  });

  describe('canActivate method', () => {
    it('should set the request payload if the token is valid', async () => {
      const mockRequest = { headers: { authorization: `Bearer ${mockToken}` } };
      const mockContext = { switchToHttp: () => ({ getRequest: () => mockRequest }) } as ExecutionContext;
      const result = await guard.canActivate(mockContext);
      expect(result).toBe(true);
      expect(mockRequest['payload']).toMatchObject({ sub: 'mockUserId', userId: 'mockUserId' });
    });
  });
});
