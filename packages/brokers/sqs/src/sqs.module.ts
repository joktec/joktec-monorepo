import { CounterProviders, Global, Module } from '@joktec/core';
import { SqsConsumerLoader } from './loaders';
import { SqsMetricService, TOTAL_RECEIVE_SQS_METRIC, TOTAL_SEND_SQS_METRIC } from './sqs.metric';
import { SqsService } from './sqs.service';

@Global()
@Module({
  imports: [],
  providers: [
    SqsService,
    SqsConsumerLoader,
    SqsMetricService,
    ...CounterProviders([
      { name: TOTAL_SEND_SQS_METRIC, label: ['type', 'status', 'queue', 'conId'] },
      { name: TOTAL_RECEIVE_SQS_METRIC, label: ['type', 'status', 'queue', 'conId'] },
    ]),
  ],
  exports: [SqsService],
})
export class SqsModule {}
