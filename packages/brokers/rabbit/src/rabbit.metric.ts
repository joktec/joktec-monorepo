import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const TOTAL_SEND_RABBIT_METRIC = 'total_send_rabbit_metric';
export const TOTAL_RECEIVE_RABBIT_METRIC = 'total_receive_rabbit_metric';

export enum RabbitMetricStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

@Injectable()
export class RabbitMetricService {
  constructor(
    @InjectMetric(TOTAL_SEND_RABBIT_METRIC) private totalSend: Counter<string>,
    @InjectMetric(TOTAL_RECEIVE_RABBIT_METRIC) private totalReceive: Counter<string>,
  ) {}

  send(type: string, status: RabbitMetricStatus, queue: string, conId: string = DEFAULT_CON_ID) {
    this.totalSend.inc({ type, status, queue, conId });
  }

  receive(type: string, status: RabbitMetricStatus, queue: string, conId: string = DEFAULT_CON_ID) {
    this.totalReceive.inc({ type, status, queue, conId });
  }
}

export const RabbitSendMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, propertyKey, services } = options;
      const [queueOrExchange, messages, opts = {}, conId = DEFAULT_CON_ID] = args;
      const channelKey = opts.channelKey ?? queueOrExchange ?? undefined;
      const type = String(propertyKey);

      const rabbitMetricService: RabbitMetricService = services.rabbitMetricService;

      try {
        await method(...args);
        rabbitMetricService.send(type, RabbitMetricStatus.SUCCESS, queueOrExchange, conId);
        services.pinoLogger.debug('`%s` [%s] rabbit %s success', conId, channelKey, type);
      } catch (error) {
        rabbitMetricService.send(type, RabbitMetricStatus.ERROR, queueOrExchange, conId);
        services.pinoLogger.error(error, '`%s` [%s] rabbit %s error', conId, channelKey, type);
      }
    },
    [RabbitMetricService],
  );
};
