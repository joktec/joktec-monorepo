import { Global, Module } from '@nestjs/common';
import { MetricModule } from '../../metric';
import { MicroController } from './micro.controller';
import { microLatency, MicroMetric, totalMicroCounter } from './micro.metric';

@Global()
@Module({
  imports: [MetricModule],
  controllers: [MicroController],
  providers: [MicroMetric, microLatency, totalMicroCounter],
  exports: [MicroMetric, microLatency, totalMicroCounter],
})
export class MicroModule {}
