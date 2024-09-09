import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { uniqBy } from 'lodash';
import { SessionStatus } from '../../models/constants';
import { Session } from '../../models/schemas';

@Injectable()
export class SessionRepo extends MongoRepo<Session, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Session);
  }

  async findByUserIds(userIds: string[]): Promise<Session[]> {
    if (!userIds.length) return [];
    const sessions = await this.find({
      condition: {
        userRefId: { $in: userIds },
        status: SessionStatus.ACTIVATED,
        revokedAt: null,
        fcmToken: { $ne: null },
        expiresAt: { $gt: new Date() },
      },
    });
    return uniqBy(sessions, 'fcmToken');
  }
}
