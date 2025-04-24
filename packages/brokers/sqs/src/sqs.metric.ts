import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const TOTAL_SEND_SQS_METRIC = 'total_send_sqs_metric';
export const TOTAL_RECEIVE_SQS_METRIC = 'total_receive_sqs_metric';

export enum SqsMetricStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

@Injectable()
export class SqsMetricService {
  constructor(
    @InjectMetric(TOTAL_SEND_SQS_METRIC) private totalSend: Counter<string>,
    @InjectMetric(TOTAL_RECEIVE_SQS_METRIC) private totalReceive: Counter<string>,
  ) {}

  send(type: string, status: SqsMetricStatus, queue: string, conId: string = DEFAULT_CON_ID) {
    this.totalSend.inc({ type, status, queue, conId });
  }

  receive(type: string, status: SqsMetricStatus, queue: string, conId: string = DEFAULT_CON_ID) {
    this.totalReceive.inc({ type, status, queue, conId });
  }
}

export const SqsSendMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, propertyKey, services } = options;
      const [queue, messages, opts, conId = DEFAULT_CON_ID] = args;
      const type = String(propertyKey);

      const sqsMetricService: SqsMetricService = services.sqsMetricService;

      try {
        await method(...args);
        sqsMetricService.send(type, SqsMetricStatus.SUCCESS, queue, conId);
        services.pinoLogger.debug('`%s` [%s] sqs %s success', conId, queue, type);
      } catch (error) {
        sqsMetricService.send(type, SqsMetricStatus.ERROR, queue, conId);
        services.pinoLogger.error(error, '`%s` [%s] sqs %s error', conId, queue, type);
      }
    },
    [SqsMetricService],
  );
};
