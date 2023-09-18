import fs from 'fs';
import path from 'path';
import { AbstractClientService, DEFAULT_CON_ID, Retry } from '@joktec/core';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Mailer, MailerClient } from './mailer.client';
import { MailerConfig } from './mailer.config';
import { MailerException } from './mailer.exception';
import { SendEmailMetric } from './mailer.metric';
import { MailerSendRequest, MailerSendResponse } from './models';

const RETRY_OPTS = 'mailer.retry';

export class MailerService extends AbstractClientService<MailerConfig, Mailer> implements MailerClient {
  constructor() {
    super('mailer', MailerConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MailerConfig): Promise<Mailer> {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { ...config.auth },
      logger: config.bindingLogger(this.logService),
    });
  }

  async start(client: Mailer, conId: string = DEFAULT_CON_ID): Promise<void> {
    try {
      await client.verify();
      this.logService.info('`%s` Mailer client is ready', conId);
    } catch (err) {
      this.logService.error(err, '`%s` Mailer client is not ready', conId);
      await this.clientInit(this.getConfig(conId), false);
    }
  }

  async stop(client: Mailer, conId: string = DEFAULT_CON_ID): Promise<void> {
    client.close();
    this.logService.info('`%s` Mailer client is closed', conId);
  }

  async buildHtml(
    filename: string,
    variables?: { [key: string]: any },
    conId: string = DEFAULT_CON_ID,
  ): Promise<string> {
    const config = this.getConfig(conId);
    const templatePath = path.posix.join(config.templateDir, filename);
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
    const mailOptions: Mail.Options = {
      ...req,
      from: req.from || config.sender,
    };

    if (req.template) {
      const { filename, variables } = req.template;
      mailOptions.html = await this.buildHtml(filename, variables, conId);
      delete mailOptions.text;
    }

    return this.getClient(conId).sendMail(mailOptions);
  }
}
