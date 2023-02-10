import { Client } from '@baotg/core';
import { SlackConfig } from './slack.config';
import { SlackRequest, SlackResponse } from './models';
import { IncomingWebhook } from '@slack/webhook';

export interface Slack extends Client<SlackConfig, IncomingWebhook> {
  info(msg: SlackRequest, conId?: string): Promise<SlackResponse>;

  warn(msg: SlackRequest, conId?: string): Promise<SlackResponse>;

  error(msg: SlackRequest, conId?: string): Promise<SlackResponse>;
}
