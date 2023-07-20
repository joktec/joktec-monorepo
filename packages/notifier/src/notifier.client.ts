import { Client } from '@joktec/core';
import PushNotifications from 'node-pushnotifications';
import { NotifierRegIds, NotifierRequest, NotifierResponse } from './models';
import { NotifierConfig } from './notifier.config';

export type NotifierInstance = PushNotifications;

export interface NotifierClient extends Client<NotifierConfig, NotifierInstance> {
  send(regIds: NotifierRegIds, req: NotifierRequest, conId?: string): Promise<NotifierResponse>;
}
