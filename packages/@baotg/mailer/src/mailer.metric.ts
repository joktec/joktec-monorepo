import {
  BaseMethodDecorator,
  CallbackDecoratorOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@baotg/core';
import { MailerSendResponse } from './models';

export const TRACK_STATUS_MAILER_METRIC = 'track_status_mailer_metric';

export enum SendStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum MailerMetricType {
  SEND = 'SEND',
}

@Injectable()
export class MailerMetricService {
  constructor(@InjectMetric(TRACK_STATUS_MAILER_METRIC) private trackMetric: Counter<string>) {}

  track(type: MailerMetricType, status: SendStatus, conId: string = DEFAULT_CON_ID) {
    this.trackMetric.inc({ type, status, conId });
  }
}

export const SendEmailMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackDecoratorOptions): Promise<any> => {
      const { method, args, services } = options;
      const [conId = DEFAULT_CON_ID] = args;
      const mailerMetricService: MailerMetricService = services.mailerMetricService;

      try {
        const value: MailerSendResponse = await method(...args);
        services.pinoLogger.debug('`%s` Mailer sent success', conId);
        mailerMetricService.track(MailerMetricType.SEND, SendStatus.SUCCESS, conId);
        return value;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` Mailer sent failed', conId);
        mailerMetricService.track(MailerMetricType.SEND, SendStatus.ERROR, conId);
      }
    },
    [MailerMetricService],
  );
};
