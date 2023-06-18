import { Global, Module } from '@nestjs/common';
import { microLatency, MicroMetric, totalMicroCounter } from './micro.metric';
import { MicroController } from './micro.controller';

@Global()
@Module({
  controllers: [MicroController],
  providers: [MicroMetric, microLatency, totalMicroCounter],
  exports: [MicroMetric, microLatency, totalMicroCounter],
})
export class MicroModule {}
