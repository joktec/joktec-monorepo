import { AbstractClientService, DEFAULT_CON_ID, Injectable, NotImplementedException, Retry } from '@joktec/core';
import { NotifierConfig, NotifierServiceType } from './notifier.config';
import { NotifierClient, NotifierInstance } from './notifier.client';
import { NotifierRequest, NotifierResult, NotifierTopicResponse } from './models';
import { ApnService, FcmService, SnsService } from './services';
import { IApnConfig, IFcmConfig, ISnsConfig } from './configs';

const RETRY_OPTS = 'notifier.retry';

@Injectable()
export class NotifierService extends AbstractClientService<NotifierConfig, NotifierInstance> implements NotifierClient {
  constructor() {
    super('notifier', NotifierConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: NotifierConfig): Promise<NotifierInstance> {
    switch (config.service) {
      case NotifierServiceType.FCM:
        return new FcmService(config.credential as IFcmConfig);

      case NotifierServiceType.SNS:
        return new SnsService(config.credential as ISnsConfig);

      case NotifierServiceType.APN:
        return new ApnService(config.credential as IApnConfig);

      case NotifierServiceType.ADM:
      case NotifierServiceType.WNS:
      case NotifierServiceType.WEB:
      case NotifierServiceType.MPNS:
      default:
        throw new NotImplementedException('Notifier service `%s` is not implemented: %j', config);
    }
  }

  async start(client: NotifierInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: NotifierInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  sendToTopic(topic: string, req: NotifierRequest, conId: string = DEFAULT_CON_ID): Promise<NotifierTopicResponse> {
    return this.getClient(conId).sendToTopic(topic, req);
  }

  sendToDevice(
    token: string | string[],
    req: NotifierRequest,
    conId: string = DEFAULT_CON_ID,
  ): Promise<NotifierResult> {
    return this.getClient(conId).sendToDevice(token, req);
  }
}
