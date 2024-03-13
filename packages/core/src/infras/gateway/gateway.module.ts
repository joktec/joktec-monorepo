import { Global, Module } from '@nestjs/common';
import { MetricModule, StaticModule } from '../../modules';
import { serverStaticFactory } from '../../modules/statics/static.factory';
import { GatewayController } from './gateway.controller';
import { gatewayDuration, GatewayMetric, gatewayTotal } from './gateway.metric';

@Global()
@Module({
  imports: [MetricModule, StaticModule.forRootAsync(serverStaticFactory())],
  controllers: [GatewayController],
  providers: [GatewayMetric, gatewayDuration, gatewayTotal],
  exports: [GatewayMetric, gatewayDuration, gatewayTotal],
})
export class GatewayModule {}
