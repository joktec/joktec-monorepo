import { resolve } from 'path';
import { Global, Module } from '@nestjs/common';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';
import { BullConfig } from '../../bull';
import { ConfigModule, ConfigService } from '../../config';
import { MetricModule } from '../../metric';
import { toRoute } from '../../utils';
import { GatewayConfig } from './gateway.config';
import { GatewayController } from './gateway.controller';
import { gatewayDuration, GatewayMetric, gatewayTotal } from './gateway.metric';

@Global()
@Module({
  imports: [
    MetricModule,
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
  providers: [GatewayMetric, gatewayDuration, gatewayTotal],
  exports: [GatewayMetric, gatewayDuration, gatewayTotal],
})
export class GatewayModule {}
