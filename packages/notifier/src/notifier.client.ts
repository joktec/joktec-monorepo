import { Client } from '@joktec/core';
import { NotifierConfig } from './notifier.config';
import { NotifierRegIds, NotifierRequest, NotifierResponse } from './models';
import PushNotifications from 'node-pushnotifications';

export type NotifierInstance = PushNotifications;

export interface NotifierClient extends Client<NotifierConfig, NotifierInstance> {
  send(regIds: NotifierRegIds, req: NotifierRequest, conId?: string): Promise<NotifierResponse>;
}
