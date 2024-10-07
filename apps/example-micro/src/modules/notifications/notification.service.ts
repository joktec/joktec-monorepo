import { BaseService, Injectable } from '@joktec/core';
import { groupBy } from 'lodash';
import { DEFAULT_LOCALE } from '../../app.constant';
import { NotificationStatus } from '../../models/constants';
import { Notification } from '../../models/schemas';
import { NotificationRepo, SessionRepo } from '../../repositories';
import { NotificationUtils } from './notification.utils';

@Injectable()
export class NotificationService extends BaseService<Notification, string> {
  constructor(
    protected notificationRepo: NotificationRepo,
    private sessionRepo: SessionRepo,
    private notificationUtils: NotificationUtils,
  ) {
    super(notificationRepo);
  }

  async push(notificationId: string) {
    const notification = await this.notificationRepo.findOne(notificationId);

    if (notification.topics?.length) {
      const results = await this.notificationUtils.sendByTopic(notification.topics, {
        title: notification.title[DEFAULT_LOCALE],
        body: notification.subhead[DEFAULT_LOCALE],
        data: { ...notification.payload },
      });
      await this.notificationRepo.update(
        { _id: notificationId },
        { sentAt: new Date(), results, status: NotificationStatus.ACTIVATED },
      );
      return;
    }

    if (notification.userIds?.length) {
      const userIds = notification.userIds.map(String);
      const sessions = await this.sessionRepo.findByUserIds(userIds);
      const sessionByLocale = groupBy(sessions, o => o.locale);
      const allResults = [];
      for (const locale of Object.keys(sessionByLocale)) {
        const sessionOfLocale = sessionByLocale[locale];
        const fcmTokens = sessionOfLocale.map(s => s.fcmToken);
        const result = await this.notificationUtils.sendByToken(fcmTokens, {
          title: notification.title[locale],
          body: notification.subhead[locale],
          data: { ...notification.payload },
        });
        allResults.push(result);
      }

      await this.notificationRepo.update(
        { _id: notificationId },
        { sentAt: new Date(), results: allResults, status: NotificationStatus.ACTIVATED },
      );
      return;
    }

    this.logService.warn('There is no target to push notification');
  }
}
