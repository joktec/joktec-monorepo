export interface MailerTemplate {
  templateId: string;
  templateData?: { [key: string]: any };
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
