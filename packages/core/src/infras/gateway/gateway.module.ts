import { resolve } from 'path';
import { Global, Module } from '@nestjs/common';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';
import { BullConfig } from '../../bull';
import { ConfigModule, ConfigService } from '../../config';
import { toRoute } from '../../utils';
import { GatewayConfig } from './gateway.config';
import { GatewayController } from './gateway.controller';
import { gatewayDurationSeconds, GatewayMetric, gatewayTotal } from './gateway.metric';

@Global()
@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): ServeStaticModuleOptions[] => {
        const gatewayConfig = cfg.parse(GatewayConfig, 'gateway');
        if (!gatewayConfig?.static) return [];

        const { staticPath, excludePath } = gatewayConfig.static;
        excludePath.push('metrics');

        const { swagger } = gatewayConfig;
        if (swagger?.enable) excludePath.push(swagger.path);

        const bull = cfg.parse(BullConfig, 'bull');
        if (bull?.board?.enable) excludePath.push(bull?.board?.path);

        return [{ rootPath: resolve(staticPath), exclude: excludePath.map(toRoute) }];
      },
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayMetric, gatewayDurationSeconds, gatewayTotal],
  exports: [GatewayMetric, gatewayDurationSeconds, gatewayTotal],
})
export class GatewayModule {}
