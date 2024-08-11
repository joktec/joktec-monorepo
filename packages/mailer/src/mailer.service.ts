import fs from 'fs';
import path from 'path';
import { AbstractClientService, DEFAULT_CON_ID, Retry } from '@joktec/core';
import ejs from 'ejs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import previewEmail from 'preview-email';
import pug from 'pug';
import { Mailer, MailerClient } from './mailer.client';
import { MailerConfig, MailerEngine } from './mailer.config';
import { MailerException } from './mailer.exception';
import { SendEmailMetric } from './mailer.metric';
import { MailerSendRequest, MailerSendResponse, MailerSendTemplate } from './models';

const RETRY_OPTS = 'mailer.retry';

export class MailerService extends AbstractClientService<MailerConfig, Mailer> implements MailerClient {
  constructor() {
    super('mailer', MailerConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MailerConfig): Promise<Mailer> {
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
      logger: config.bindingLogger(this.logService),
    });

    if (config.template) {
      transport.use('compile', async (mail, callback) => {
        if (mail.data['template']) {
          mail.data.html = await this.compile(mail.data['template'], config.conId);
          delete mail.data.text;
        }
        callback();
      });

      if (config.template.preview) {
        transport.use('stream', (mail, callback) => {
          return previewEmail(mail.data, config.template.preview as object)
            .then(() => callback())
            .catch(callback);
        });
      }
    }

    return transport;
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

  async compile(req: MailerSendTemplate, conId: string = DEFAULT_CON_ID): Promise<string> {
    const config = this.getConfig(conId);

    const templatePath = path.join(config.template.dir, req.name);
    if (!fs.existsSync(templatePath)) {
      throw new MailerException('TEMPLATE_PATH_NOT_FOUND: %s', templatePath);
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    const engine = req.engine || config.template.engine;
    switch (engine) {
      case MailerEngine.HBS:
        return handlebars.compile(templateContent)(req.context, req.options as any);
      case MailerEngine.PUG:
        return pug.compile(templateContent, req.options as any)(req.context);
      case MailerEngine.EJS:
        return ejs.compile(templateContent, req.options as any)(req.context);
      default:
        throw new MailerException('TEMPLATE_ENGINE_NOT_SUPPORT', { engine });
    }
  }

  @SendEmailMetric()
  async send(req: MailerSendRequest, conId: string = DEFAULT_CON_ID): Promise<MailerSendResponse> {
    const config = this.getConfig(conId);
    return this.getClient(conId).sendMail({ ...req, from: req.from || config.sender });
  }
}
