import { resolve } from 'path';
import { toRoute } from '@joktec/utils';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { GatewayConfig } from '../../infras';
import { BullConfig } from '../bull';
import { ConfigModule, ConfigService } from '../config';

export function initServerStatic(configService: ConfigService): ServeStaticModuleOptions[] {
  const gatewayConfig = configService.parse(GatewayConfig, 'gateway');
  if (!gatewayConfig?.static) return [];

  const { staticPath, excludePath } = gatewayConfig.static;
  excludePath.push('metrics');

  const { swagger } = gatewayConfig;
  if (swagger?.enable) excludePath.push(swagger.path);

  const bull = configService.parse(BullConfig, 'bull');
  if (bull?.board?.enable) excludePath.push(bull?.board?.path);

  return [{ rootPath: resolve(staticPath), exclude: excludePath.map(toRoute) }];
}

export function serverStaticFactory() {
  return {
    isGlobal: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => initServerStatic(configService),
  };
}
