import { AbstractClientService, DEFAULT_CON_ID, Retry } from '@baotg/core';
import { MailerClient } from './mailer.client';
import mailgun, { Mailgun } from 'mailgun-js';
import { MailerConfig } from './mailer.config';
import { MailerSendRequest, MailerSendResponse } from './models';
import { SendEmailMetric } from './mailer.metric';

const RETRY_OPTS = 'mailer.retry';

export class MailerService extends AbstractClientService<MailerConfig, Mailgun> implements MailerClient {
  constructor() {
    super('mailer', MailerConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MailerConfig): Promise<Mailgun> {
    return mailgun({ apiKey: config.apiKey, domain: config.domain });
  }

  async start(client: Mailgun, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: Mailgun, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  @SendEmailMetric()
  async send(req: MailerSendRequest, conId: string = DEFAULT_CON_ID): Promise<MailerSendResponse> {
    const sender = req.from || `JobHopin Team <${this.getConfig(conId).sender}>`;
    return this.getClient(conId)
      .messages()
      .send({ ...req, from: sender });
  }
}
