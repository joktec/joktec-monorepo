import { Client } from '@baotg/core';
import { NotifierConfig } from './notifier.config';
import { NotifierRequest, NotifierResult, NotifierTopicResponse } from './models';
import { ApnService, FcmService, SnsService } from './services';

export type NotifierInstance = FcmService | SnsService | ApnService;

export interface INotifierClient {
  sendToTopic(topic: string, req: NotifierRequest, conId?: string): Promise<NotifierTopicResponse>;

  sendToDevice(token: string | string[], req: NotifierRequest, conId?: string): Promise<NotifierResult>;
}

export interface NotifierClient extends Client<NotifierConfig, NotifierInstance>, INotifierClient {}
