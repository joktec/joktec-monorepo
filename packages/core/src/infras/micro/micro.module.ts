import { Global, Module } from '@nestjs/common';
import { microLatency, MicroPromInterceptor, totalMicroCounter } from './micro-prom.interceptor';
import { MicroController } from './micro.controller';

@Global()
@Module({
  controllers: [MicroController],
  providers: [MicroPromInterceptor, microLatency, totalMicroCounter],
  exports: [MicroPromInterceptor, microLatency, totalMicroCounter],
})
export class MicroModule {}
