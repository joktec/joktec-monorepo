import { IncomingWebhookDefaultArguments } from '@slack/webhook';

export enum AlertColor {
  INFO = '#339901',
  SUCCESS = '#339900',
  WARN = '#FFCC00',
  ERROR = '#CC3300',
}

export enum AlertLevel {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface AlertTitle {
  title: string;
  code?: string | number;
  url?: string;
  icon?: string;
}

export interface AlertRequest extends IncomingWebhookDefaultArguments {
  chatId?: string;
  title: string | AlertTitle;
  level?: AlertLevel;
  color?: string | AlertColor;
  message?: string | object;
}
