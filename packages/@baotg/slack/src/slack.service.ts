import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@baotg/core';
import { SlackConfig } from './slack.config';
import { IncomingWebhook } from '@slack/webhook';
import { SlackRequest } from './models';
import { Slack } from './slack.client';
import { IncomingWebhookResult } from '@slack/webhook/dist/IncomingWebhook';
import { SlackUtils } from './slack.utils';

@Injectable()
export class SlackService extends AbstractClientService<SlackConfig, IncomingWebhook> implements Slack {
  constructor() {
    super('slack', SlackConfig);
  }

  async init(config: SlackConfig): Promise<IncomingWebhook> {
    const { team, service, token } = config;
    const webhookUrl = `https://hooks.slack.com/services/${team}/${service}/${token}`;
    return new IncomingWebhook(webhookUrl);
  }

  async start(client: IncomingWebhook, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  async stop(client: IncomingWebhook, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  async info(msg: SlackRequest, conId: string = DEFAULT_CON_ID): Promise<IncomingWebhookResult> {
    const title = `:white_check_mark: *[${msg.code}] - ${msg.context} *`;
    return this.getClient(conId).send({
      channel: msg.channel,
      attachments: [
        {
          color: '#339900',
          blocks: [
            { type: 'section', text: { type: 'mrkdwn', text: title } },
            { type: 'section', text: { type: 'plain_text', text: SlackUtils.parseMessage(msg.message), emoji: true } },
          ],
        },
      ],
    });
  }

  async warn(msg: SlackRequest, conId: string = DEFAULT_CON_ID): Promise<IncomingWebhookResult> {
    const title = `:warning: *[${msg.code}] - ${msg.context} *`;
    return this.getClient(conId).send({
      channel: msg.channel,
      attachments: [
        {
          color: '#FFCC00',
          blocks: [
            { type: 'section', text: { type: 'mrkdwn', text: title } },
            { type: 'section', text: { type: 'plain_text', text: SlackUtils.parseMessage(msg.message), emoji: true } },
          ],
        },
      ],
    });
  }

  async error(msg: SlackRequest, conId: string = DEFAULT_CON_ID): Promise<IncomingWebhookResult> {
    const title = `:sos: *[${msg.code}] - ${msg.context} *`;
    return this.getClient(conId).send({
      channel: msg.channel,
      attachments: [
        {
          color: '#CC3300',
          blocks: [
            { type: 'section', text: { type: 'mrkdwn', text: title } },
            { type: 'section', text: { type: 'plain_text', text: SlackUtils.parseMessage(msg.message), emoji: true } },
          ],
        },
      ],
    });
  }
}
