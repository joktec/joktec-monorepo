import { Global, Module } from '@nestjs/common';
import { gatewayDurationSeconds, GatewayMetric, gatewayTotal } from './gateway.metric';
import { GatewayController } from './gateway.controller';

@Global()
@Module({
  controllers: [GatewayController],
  providers: [GatewayMetric, gatewayDurationSeconds, gatewayTotal],
  exports: [GatewayMetric, gatewayDurationSeconds, gatewayTotal],
})
export class GatewayModule {}
