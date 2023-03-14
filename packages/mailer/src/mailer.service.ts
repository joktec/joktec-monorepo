import { AbstractClientService, DEFAULT_CON_ID, Retry } from '@joktec/core';
import { Mailer, MailerClient } from './mailer.client';
import { MailerConfig, MailerServiceType } from './mailer.config';
import { MailerSendRequest, MailerSendResponse } from './models';
import { SendEmailMetric } from './mailer.metric';
import { MailerException } from './mailer.exception';
import { MailgunService, SendgridService } from './services';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';

const RETRY_OPTS = 'mailer.retry';

export class MailerService extends AbstractClientService<MailerConfig, Mailer> implements MailerClient {
  constructor() {
    super('mailer', MailerConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MailerConfig): Promise<Mailer> {
    switch (config.service) {
      case MailerServiceType.MAILGUN:
        return MailgunService.init(config);

      case MailerServiceType.SENDGRID:
        return SendgridService.init(config);

      default:
        throw new MailerException('MAILER_SERVICE_NOT_IMPLEMENTED', config);
    }
  }

  async start(client: Mailer, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: Mailer, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async buildHtml(
    filename: string,
    variables?: { [key: string]: any },
    conId: string = DEFAULT_CON_ID,
  ): Promise<string> {
    const config = this.getConfig(conId);
    const templatePath = path.posix.join(__dirname, config.templateDir, filename);
    if (!fs.existsSync(templatePath)) {
      throw new MailerException('TEMPLATE_PATH_NOT_FOUND', templatePath);
    }

    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateContent);
    return template(variables);
  }

  @SendEmailMetric()
  async send(req: MailerSendRequest, conId: string = DEFAULT_CON_ID): Promise<MailerSendResponse> {
    const config = this.getConfig(conId);
    const sender = req.from || `MyCompany <${config.sender}>`;
    return this.getClient(conId).send({ ...req, from: sender });
  }
}
