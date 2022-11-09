import { Global, Module } from '@nestjs/common';
import { gatewayPromInterceptors } from './gateway-prom.interceptor';
import { GatewayRest } from './gateway.rest';

@Global()
@Module({
  controllers: [GatewayRest],
  providers: [...gatewayPromInterceptors],
  exports: [...gatewayPromInterceptors],
})
export class GatewayModule {}
