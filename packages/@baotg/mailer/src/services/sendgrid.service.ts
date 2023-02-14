import { IMailerClient } from '../mailer.client';
import { MailerConfig } from '../mailer.config';
import { MailerSendRequest, MailerSendResponse } from '../models';
import { Client as SendGridClient } from '@sendgrid/client';
import { classes } from '@sendgrid/helpers';
import { MailData } from '@sendgrid/helpers/classes/mail';

export class SendgridService implements IMailerClient {
  private _config: MailerConfig;
  private _client: SendGridClient;

  private constructor(config: MailerConfig) {
    this._config = config;
    this._client = new SendGridClient();
    this._client.setApiKey(this._config.apiKey);
  }

  public static init(config: MailerConfig) {
    return new SendgridService(config);
  }

  async send(req: MailerSendRequest): Promise<MailerSendResponse> {
    const data: MailData = {
      ...req,
      from: req.from,
      templateId: req.template || null,
    };

    const mail = classes.Mail.create(data);
    const [res] = await this._client.request({
      method: 'POST',
      url: '/v3/mail/send',
      headers: mail.toJSON().headers,
      body: mail.toJSON(),
    });

    return res;
  }
}
