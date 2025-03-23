import { Global, Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricController } from './metric.controller';

@Global()
@Module({
  imports: [
    PrometheusModule.register({
      controller: MetricController,
      defaultMetrics: { enabled: false },
    }),
  ],
})
export class MetricModule {}
