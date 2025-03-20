import { Injectable, LogService } from '@joktec/core';
import { NotifierResponse, NotifierService } from '@joktec/notifier';
import { toInt, truncateText } from '@joktec/utils';

export interface IMessagingPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
}

@Injectable()
export class NotificationUtils {
  constructor(
    private logService: LogService,
    private notifierService: NotifierService,
  ) {
    this.logService.setContext(NotificationUtils.name);
  }

  async sendByTopic(topics: string[], payload: IMessagingPayload): Promise<NotifierResponse[]> {
    const result = await this.notifierService.send({
      regIds: [...topics],
      data: {
        title: truncateText(payload.title, 100),
        body: truncateText(payload.body, 250),
        // icon: notification.image || '',
        custom: { ...payload.data },
        priority: 'high',
        badge: toInt(payload.data.notificationCount, 1),
      },
    });
    this.logService.info({ topics, payload, result }, 'Send to topic');
    return result;
  }

  async sendByToken(tokens: string[], payload: IMessagingPayload): Promise<NotifierResponse[]> {
    const result = await this.notifierService.send({
      regIds: [...tokens],
      data: {
        title: truncateText(payload.title, 100),
        body: truncateText(payload.body, 250),
        // icon: notification.image || '',
        custom: { ...payload.data },
        priority: 'high',
        badge: toInt(payload.data.notificationCount, 1),
      },
    });
    this.logService.info({ tokens, payload, result }, 'Push notification to token');
    return result;
  }
}
