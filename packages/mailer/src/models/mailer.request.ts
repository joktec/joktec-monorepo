export interface MailerTemplate {
  filename: string;
  variables?: { [key: string]: any };
}

export interface MailerSendRequest {
  subject: string;
  to: string | string[];
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  text?: string;
  html?: string;
  template?: MailerTemplate;
}
