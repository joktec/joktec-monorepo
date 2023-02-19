import { IMailerClient } from '../mailer.client';
import { MailerConfig } from '../mailer.config';
import { MailerSendRequest, MailerSendResponse } from '../models';
import mailgun, { Mailgun, messages } from 'mailgun-js';

export class MailgunService implements IMailerClient {
  private _config: MailerConfig;
  private _client: Mailgun;

  private constructor(config: MailerConfig) {
    this._config = config;
    this._client = mailgun({
      apiKey: this._config.apiKey,
      domain: this._config.domain,
    });
  }

  public static init(config: MailerConfig) {
    return new MailgunService(config);
  }

  async send(req: MailerSendRequest): Promise<MailerSendResponse> {
    const data: messages.SendData | messages.SendTemplateData = { ...req };
    if (req.template) {
      Object.assign(data, {
        template: req.template.templateId,
        ...req.template.templateData,
      });
    }
    return this._client.messages().send({ ...req });
  }
}
