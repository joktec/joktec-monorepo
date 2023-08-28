import { BaseService, Injectable } from '@joktec/core';
import { uniqBy } from 'lodash';
import { Session, SessionStatus } from './models';
import { SessionRepo } from './session.repo';

@Injectable()
export class SessionService extends BaseService<Session, string> {
  constructor(protected sessionRepo: SessionRepo) {
    super(sessionRepo);
  }

  async findTokenByUserIds(userIds: string[]): Promise<string[]> {
    if (!userIds.length) return [];
    const sessions = await this.sessionRepo.find({
      condition: {
        userId: { $in: userIds },
        status: SessionStatus.ACTIVATED,
        revokedAt: { $ne: null },
        registrationId: { $ne: null },
        expiresAt: { $gt: new Date() },
      },
    });
    return uniqBy(sessions, 'registrationId').map(s => s.registrationId);
  }

  async findByTokenId(tokenId: string): Promise<Session> {
    return this.sessionRepo.findOne({ condition: { tokenId } });
  }

  async deleteByUserId(userId: string): Promise<number> {
    const sessions = await this.sessionRepo.find({ condition: { userId } });
    const res = await Promise.all(sessions.map(s => this.sessionRepo.delete({ _id: s._id }, { force: true })));
    return res.length;
  }
}
