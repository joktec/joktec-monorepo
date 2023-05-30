import { Global, Module } from '@nestjs/common';
import { gatewayDurationSeconds, GatewayPromInterceptor, gatewayTotal } from './gateway-prom.interceptor';
import { GatewayController } from './gateway.controller';

@Global()
@Module({
  controllers: [GatewayController],
  providers: [GatewayPromInterceptor, gatewayDurationSeconds, gatewayTotal],
  exports: [GatewayPromInterceptor, gatewayDurationSeconds, gatewayTotal],
})
export class GatewayModule {}
