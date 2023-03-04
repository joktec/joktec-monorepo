import { Client } from '@joktec/core';
import { AlertConfig } from './alert.config';
import { AlertRequest, AlertResponse } from './models';
import { IncomingWebhook } from '@slack/webhook';
import { Telegraf } from 'telegraf';

export type AlertClient = Telegraf;
export interface Alert extends Client<AlertConfig, IncomingWebhook> {
  send(msg: AlertRequest, conId?: string): Promise<AlertResponse>;
}
