import { messages } from 'mailgun-js';
import { classes } from '@sendgrid/helpers';

export type MailerSendResponse = messages.SendResponse | classes.Response;
