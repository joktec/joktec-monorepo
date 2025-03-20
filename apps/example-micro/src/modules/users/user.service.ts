import { BaseService, Injectable } from '@joktec/core';
import { FirebaseService } from '@joktec/firebase';
import { toArray, toInt } from '@joktec/utils';
import { SuccessResponse } from '../../common';
import { ArticleType, SessionStatus } from '../../models/constants';
import { UserKeyword } from '../../models/objects';
import { Session, User } from '../../models/schemas';
import { SessionRepo, UserRepo } from '../../repositories';

@Injectable()
export class UserService extends BaseService<User, string> {
  constructor(
    protected userRepo: UserRepo,
    private sessionRepo: SessionRepo,
    private firebaseService: FirebaseService,
  ) {
    super(userRepo);
  }

  async logKeyword(userId: string, value: string, type: ArticleType): Promise<SuccessResponse> {
    const user = await this.userRepo.findOne(userId);
    const isExistKeyword = user.keywords.some(key => key.value === value);
    if (!isExistKeyword) {
      const userKeyword: Partial<UserKeyword> = { value, type };
      await this.userRepo.update(userId, { $push: { keywords: userKeyword } });
      return { success: true };
    }

    for (const keyword of user.keywords) {
      if (keyword.value === value) {
        keyword.lastSearchAt = new Date();
        keyword.count = toInt(keyword.count, 1) + 1;
        keyword.hidden = false;
        await this.userRepo.updateKeyword(userId, keyword);
        continue;
      }

      if (!keyword.lastSearchAt || !keyword.count) {
        if (!keyword.lastSearchAt) keyword.lastSearchAt = new Date();
        if (!keyword.count) keyword.count = 1;
        await this.userRepo.updateKeyword(userId, keyword);
      }
    }

    return { success: true };
  }

  async subscribeToTopic(user: User, session: Session) {
    if (session.topics?.length) {
      for (const topic of session.topics) {
        await this.firebaseService.messaging().unsubscribeFromTopic(session.fcmToken, topic);
        await this.sessionRepo.update(session._id, { $pull: { topics: topic } });
      }
    }

    const topics = toArray<string>(user.config?.topics).map(topic => `${topic}-${session.locale}`);
    for (const topic of topics) {
      await this.firebaseService.messaging().subscribeToTopic(session.fcmToken, topic);
      await this.sessionRepo.update(session._id, { $push: { topics: topic } });
    }
    return topics.length;
  }

  async unsubscribeFromTopic(session: Session) {
    for (const topic of session.topics) {
      await this.firebaseService.messaging().unsubscribeFromTopic(session.fcmToken, topic);
      await this.sessionRepo.update(session._id, { $pull: { topics: topic } });
    }
    return session.topics.length;
  }

  async resubscribeToTopic(user: User, session: Session, oldFcmToken: string) {
    for (const topic of session.topics) {
      await this.firebaseService.messaging().unsubscribeFromTopic(oldFcmToken, topic);
      await this.subscribeToTopic(user, session);
    }
  }

  async refreshTopic(user: User) {
    const sessions = await this.sessionRepo.find({
      condition: { userRefId: user._id, fcmToken: { $ne: null } },
    });
    for (const session of sessions) {
      if (session.status === SessionStatus.ACTIVATED) {
        await this.subscribeToTopic(user, session);
        continue;
      }
      await this.unsubscribeFromTopic(session);
    }
    return sessions.length;
  }
}
