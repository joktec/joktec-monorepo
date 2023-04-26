import { describe, expect, it } from '@jest/globals';
import { JwtConfig } from '../jwt.config';
import { ConfigService } from '../../config';

describe('JwtConfig class', () => {
  describe('constructor', () => {
    it('should create a new instance with default values', () => {
      const jwtConfig = new JwtConfig();
      expect(jwtConfig.secretKey).toEqual('$ecr3t_4ey');
      expect(jwtConfig.refreshKey).toEqual('r3fre$h_4ey');
      expect(jwtConfig.expired).toEqual('30 days');
    });

    it('should create a new instance with custom values', () => {
      const props = {
        secretKey: 'custom_secret_key',
        refreshKey: 'custom_refresh_key',
        expired: '7 days',
      };
      const jwtConfig = new JwtConfig(props);
      expect(jwtConfig.secretKey).toEqual(props.secretKey);
      expect(jwtConfig.refreshKey).toEqual(props.refreshKey);
      expect(jwtConfig.expired).toEqual(props.expired);
    });

    it('should create a new instance with values from ConfigService', () => {
      const configService = new ConfigService();
      const jwtConfig = new JwtConfig(configService.get('guard'));
      expect(jwtConfig.secretKey).toEqual('$ecr3t_4ey');
      expect(jwtConfig.refreshKey).toEqual('r3fre$h_4ey');
      expect(jwtConfig.expired).toEqual('30 days');
    });
  });
});
