import { IncomingWebhookDefaultArguments } from '@slack/webhook';

export interface SlackRequest extends IncomingWebhookDefaultArguments {
  channel?: string;
  code?: number | string;
  context?: string;
  message?: string | object;
}
