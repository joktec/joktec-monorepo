import { CounterProviders, DEFAULT_CON_ID, DynamicModule, Global, Module, toArray } from '@joktec/core';
import { RabbitConsumerLoader } from './loaders';
import { RABBIT_AUTO_BINDING, RabbitAutoBindingRegistry, RabbitModuleOptions } from './models';
import { RabbitMetricService, TOTAL_CONSUME_RABBIT_METRIC, TOTAL_PUBLISH_RABBIT_METRIC } from './rabbit.metric';
import { RabbitService } from './rabbit.service';

const providers = [
  RabbitService,
  RabbitConsumerLoader,
  RabbitMetricService,
  ...CounterProviders([
    { name: TOTAL_PUBLISH_RABBIT_METRIC, label: ['type', 'status', 'queue', 'conId'] },
    { name: TOTAL_CONSUME_RABBIT_METRIC, label: ['status', 'queue', 'conId'] },
  ]),
];

@Global()
@Module({
  imports: [],
  providers: [...providers, { provide: RABBIT_AUTO_BINDING, useValue: [] }],
  exports: [RabbitService],
})
export class RabbitModule {
  static forRoot(...opts: RabbitModuleOptions[]): DynamicModule {
    const autoBindingProviders: RabbitAutoBindingRegistry = toArray(opts).reduce(
      (curr: object, acc: RabbitModuleOptions) => {
        curr[acc.conId || DEFAULT_CON_ID] = toArray(acc.autoBinding);
        return curr;
      },
      {},
    );

    return {
      module: RabbitModule,
      providers: [...providers, { provide: RABBIT_AUTO_BINDING, useValue: autoBindingProviders }],
      exports: [RabbitService],
    };
  }
}
