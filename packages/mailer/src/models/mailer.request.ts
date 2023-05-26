export interface MailerTemplate {
  filename: string;
  variables?: { [key: string]: any };
}

export interface MailerSendRequest {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject?: string;
  text?: string;
  html?: string;
  template?: MailerTemplate;
}
