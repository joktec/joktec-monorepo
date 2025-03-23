import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MetricModule } from '../../modules';
import { MicroController } from './micro.controller';
import { MicroMetricInterceptor } from './micro.interceptor';
import { microLatency, totalMicroCounter } from './micro.metric';

export interface MicroModuleOptions {
  metric?: boolean;
}

@Global()
@Module({})
export class MicroModule {
  static forRoot(options: MicroModuleOptions = {}): DynamicModule {
    const providers: Provider[] = [];
    const imports: any[] = [];
    const exports: any[] = [];

    if (options.metric) {
      imports.push(MetricModule);
      providers.push(MicroMetricInterceptor, microLatency, totalMicroCounter);
      exports.push(MicroMetricInterceptor, microLatency, totalMicroCounter);
    }

    return { module: MicroModule, imports, controllers: [MicroController], providers, exports };
  }
}
