import { CounterProviders, DEFAULT_CON_ID, DynamicModule, Global, Module } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { SqsConsumerLoader } from './loaders';
import { SQS_AUTO_BINDING, SqsAutoBindingRegistry, SqsModuleOptions } from './models';
import { SqsMetricService, TOTAL_RECEIVE_SQS_METRIC, TOTAL_SEND_SQS_METRIC } from './sqs.metric';
import { SqsService } from './sqs.service';

const providers = [
  SqsService,
  SqsConsumerLoader,
  SqsMetricService,
  ...CounterProviders([
    { name: TOTAL_SEND_SQS_METRIC, label: ['type', 'status', 'queue', 'conId'] },
    { name: TOTAL_RECEIVE_SQS_METRIC, label: ['type', 'status', 'queue', 'conId'] },
  ]),
];

@Global()
@Module({
  imports: [],
  providers: [...providers, { provide: SQS_AUTO_BINDING, useValue: [] }],
  exports: [SqsService],
})
export class SqsModule {
  static forRoot(...opts: SqsModuleOptions[]): DynamicModule {
    const autoBindingProviders: SqsAutoBindingRegistry = toArray(opts).reduce((curr: object, acc: SqsModuleOptions) => {
      curr[acc.conId || DEFAULT_CON_ID] = toArray(acc.autoBinding);
      return curr;
    }, {});

    return {
      module: SqsModule,
      providers: [...providers, { provide: SQS_AUTO_BINDING, useValue: autoBindingProviders }],
      exports: [SqsService],
    };
  }
}
