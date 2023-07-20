import { Global, Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { gatewayDurationSeconds, GatewayMetric, gatewayTotal } from './gateway.metric';

@Global()
@Module({
  controllers: [GatewayController],
  providers: [GatewayMetric, gatewayDurationSeconds, gatewayTotal],
  exports: [GatewayMetric, gatewayDurationSeconds, gatewayTotal],
})
export class GatewayModule {}
