import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { IncomingWebhook } from '@slack/webhook';
import { IncomingWebhookResult } from '@slack/webhook/dist/IncomingWebhook';
import { Telegraf } from 'telegraf';
import { Alert } from './alert.client';
import { AlertConfig } from './alert.config';
import { AlertUtils, buildTitle } from './alert.utils';
import { AlertRequest } from './models';

const RETRY_OPTS = 'alert.retry';

@Injectable()
export class AlertService extends AbstractClientService<AlertConfig, IncomingWebhook> implements Alert {
  constructor() {
    super('alert', AlertConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: AlertConfig): Promise<IncomingWebhook> {
    const { chatId, service, token } = config;
    const webhookUrl = `https://hooks.slack.com/services/${chatId}/${service}/${token}`;

    const bot = new Telegraf(token);
    bot.telegram.sendMessage(chatId, '', {
      parse_mode: 'MarkdownV2',
    });

    return new IncomingWebhook(webhookUrl);
  }

  async start(client: IncomingWebhook, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  async stop(client: IncomingWebhook, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  async send(msg: AlertRequest, conId: string = DEFAULT_CON_ID): Promise<IncomingWebhookResult> {
    const title = buildTitle(msg.title);
    return this.getClient(conId).send({
      channel: msg.chatId,
      attachments: [
        {
          color: msg.color,
          blocks: [
            { type: 'section', text: { type: 'mrkdwn', text: title } },
            { type: 'section', text: { type: 'plain_text', text: AlertUtils.parseMessage(msg.message), emoji: true } },
          ],
        },
      ],
    });
  }
}
