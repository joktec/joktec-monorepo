import { resolve } from 'path';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { GatewayConfig } from '../../infras';
import { toRoute } from '../../utils';
import { BullConfig } from '../bull';
import { ConfigService } from '../config';

export function initServerStatic(cfg: ConfigService): ServeStaticModuleOptions[] {
  const gatewayConfig = cfg.parse(GatewayConfig, 'gateway');
  if (!gatewayConfig?.static) return [];

  const { staticPath, excludePath } = gatewayConfig.static;
  excludePath.push('metrics');

  const { swagger } = gatewayConfig;
  if (swagger?.enable) excludePath.push(swagger.path);

  const bull = cfg.parse(BullConfig, 'bull');
  if (bull?.board?.enable) excludePath.push(bull?.board?.path);

  return [{ rootPath: resolve(staticPath), exclude: excludePath.map(toRoute) }];
}
