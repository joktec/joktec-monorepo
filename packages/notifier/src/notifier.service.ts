import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import PushNotifications from 'node-pushnotifications';
import { NotifierRequest, NotifierResponse } from './models';
import { NotifierClient, NotifierInstance } from './notifier.client';
import { NotifierConfig } from './notifier.config';

const RETRY_OPTS = 'notifier.retry';

@Injectable()
export class NotifierService extends AbstractClientService<NotifierConfig, NotifierInstance> implements NotifierClient {
  constructor() {
    super('notifier', NotifierConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: NotifierConfig): Promise<NotifierInstance> {
    return new PushNotifications({
      ...config,
      fcm: config.fcm.getCredential(),
    } as any);
  }

  async start(client: NotifierInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: NotifierInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  send(req: NotifierRequest, conId: string = DEFAULT_CON_ID): Promise<NotifierResponse[]> {
    return this.getClient(conId).send(req.regIds, req.data);
  }
}
