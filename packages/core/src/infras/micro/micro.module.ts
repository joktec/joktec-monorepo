import { Global, Module } from '@nestjs/common';
import { MicroController } from './micro.controller';
import { microLatency, MicroMetric, totalMicroCounter } from './micro.metric';

@Global()
@Module({
  controllers: [MicroController],
  providers: [MicroMetric, microLatency, totalMicroCounter],
  exports: [MicroMetric, microLatency, totalMicroCounter],
})
export class MicroModule {}
