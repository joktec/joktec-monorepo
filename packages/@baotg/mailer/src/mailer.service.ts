import {
  AbstractClientService,
  DEFAULT_CON_ID,
  InvalidClientConfigException,
  NotImplementedException,
  Retry,
} from '@baotg/core';
import { Mailer, MailerClient } from './mailer.client';
import { MailerConfig, MailerSource } from './mailer.config';
import { MailerSendRequest, MailerSendResponse } from './models';
import { SendEmailMetric } from './mailer.metric';
import { MailgunService, SendgridService } from './services';

const RETRY_OPTS = 'mailer.retry';

export class MailerService extends AbstractClientService<MailerConfig, Mailer> implements MailerClient {
  constructor() {
    super('mailer', MailerConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MailerConfig): Promise<Mailer> {
    switch (config.source) {
      case MailerSource.MAILGUN:
        return MailgunService.init(config);

      case MailerSource.SENDGRID:
        return SendgridService.init(config);

      default:
        throw new NotImplementedException('This email source is not implement', config);
    }
  }

  async start(client: Mailer, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: Mailer, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  @SendEmailMetric()
  async send(req: MailerSendRequest, conId: string = DEFAULT_CON_ID): Promise<MailerSendResponse> {
    const config = this.getConfig(conId);
    const sender = req.from || `JobHopin Team <${config.sender}>`;
    return this.getClient(conId).send({
      ...req,
      from: sender,
      template: req.template || config.templateId || undefined,
    });
  }
}
