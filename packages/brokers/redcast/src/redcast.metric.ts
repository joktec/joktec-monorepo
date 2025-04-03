import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const TOTAL_SEND_REDCAST_METRIC = 'total_send_redcast_metric';
export const TOTAL_RECEIVE_REDCAST_METRIC = 'total_receive_redcast_metric';

export enum RedcastMetricStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

@Injectable()
export class RedcastMetricService {
  constructor(
    @InjectMetric(TOTAL_SEND_REDCAST_METRIC) private totalSend: Counter<string>,
    @InjectMetric(TOTAL_RECEIVE_REDCAST_METRIC) private totalReceive: Counter<string>,
  ) {}

  send(type: string, status: RedcastMetricStatus, channel: string, conId: string = DEFAULT_CON_ID) {
    this.totalSend.inc({ type, status, channel, conId });
  }

  receive(type: string, status: RedcastMetricStatus, channelOrPattern: string, conId: string = DEFAULT_CON_ID) {
    this.totalReceive.inc({ type, status, channel: channelOrPattern, conId });
  }
}

export const RedcastSendMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, propertyKey, services } = options;
      const [channel, message, conId = DEFAULT_CON_ID] = args;
      const type = String(propertyKey);

      const redcastMetricService: RedcastMetricService = services.redcastMetricService;

      try {
        await method(...args);
        redcastMetricService.send(type, RedcastMetricStatus.SUCCESS, channel, conId);
        services.pinoLogger.debug('`%s` [%s] redcast %s success', conId, channel, type);
      } catch (error) {
        redcastMetricService.send(type, RedcastMetricStatus.ERROR, channel, conId);
        services.pinoLogger.error(error, '`%s` [%s] redcast %s error', conId, channel, type);
      }
    },
    [RedcastMetricService],
  );
};
