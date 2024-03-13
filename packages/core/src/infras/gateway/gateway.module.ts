import { Global, Module } from '@nestjs/common';
import { MetricModule, StaticModule } from '../../modules';
import { GatewayController } from './gateway.controller';
import { gatewayDuration, GatewayMetric, gatewayTotal } from './gateway.metric';

@Global()
@Module({
  imports: [MetricModule, StaticModule],
  controllers: [GatewayController],
  providers: [GatewayMetric, gatewayDuration, gatewayTotal],
  exports: [GatewayMetric, gatewayDuration, gatewayTotal],
})
export class GatewayModule {}
