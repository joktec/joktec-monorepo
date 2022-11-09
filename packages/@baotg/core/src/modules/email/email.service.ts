import { Injectable } from '@nestjs/common';
import mailgun from 'mailgun-js';

interface EmailOption {
  readonly from?: string;
  readonly to: string;
  readonly subject: string;
  readonly html?: string;
  readonly text?: string;
}

@Injectable()
export class EmailService {
  constructor() {
    this.mg = mailgun({
      apiKey: process.env.MAILGUN_SECRET as string,
      domain: process.env.MAILGUN_DOMAIN as string,
    });
  }

  readonly mg;

  sendMail(options: EmailOption) {
    this.mg.messages().send(
      {
        from: options.from || `JobHopin Team <${process.env.EMAIL_HOST_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      },
      (error: any, body: any) => {
        if (error) {
          console.error(error);
        }
        console.log(body);
      },
    );
  }
}
