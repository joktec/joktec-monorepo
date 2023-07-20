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
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
      logger: {
        level: lv => this.logService.trace(lv),
        trace: msg => this.logService.trace(msg),
        debug: msg => this.logService.debug(msg),
        info: msg => this.logService.info(msg),
        warn: msg => this.logService.warn(msg),
        error: msg => this.logService.error(msg),
        fatal: msg => this.logService.fatal(msg),
      },
    });
  }

  async start(client: Mailer, conId: string = DEFAULT_CON_ID): Promise<void> {
    try {
      await client.verify();
      this.logService.info(`Mailer client ${conId} is ready`);
    } catch (err) {
      this.logService.error(err, `Mailer client ${conId} is not ready`);
      await this.clientInit(this.getConfig(conId), false);
    }
  }

  async stop(client: Mailer, conId: string = DEFAULT_CON_ID): Promise<void> {
    client.close();
    this.logService.info(`Mailer client ${conId} is closed`);
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
