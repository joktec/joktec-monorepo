import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MetricModule, StaticModule } from '../../modules';
import { serverStaticFactory } from '../../modules/statics/static.factory';
import { GatewayController } from './gateway.controller';
import { gatewayDuration, GatewayMetric, gatewayTotal } from './gateway.metric';

export interface GatewayModuleOptions {
  metric?: boolean;
  static?: boolean;
}

@Global()
@Module({})
export class GatewayModule {
  static forRoot(options: GatewayModuleOptions = {}): DynamicModule {
    const providers: Provider[] = [];
    const imports: any[] = [];
    const exports: any[] = [];

    if (options.static) {
      imports.push(StaticModule.forRootAsync(serverStaticFactory()));
    }

    if (options.metric) {
      imports.push(MetricModule);
      providers.push(GatewayMetric, gatewayDuration, gatewayTotal);
      exports.push(GatewayMetric, gatewayDuration, gatewayTotal);
    }

    return { module: GatewayModule, imports, controllers: [GatewayController], providers, exports };
  }
}
