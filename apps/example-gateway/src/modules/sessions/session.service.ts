import { BaseService, Injectable } from '@joktec/core';
import { Session } from './models';
import { SessionRepo } from './session.repo';

@Injectable()
export class SessionService extends BaseService<Session, string> {
  constructor(protected sessionRepo: SessionRepo) {
    super(sessionRepo);
  }

  async findByTokenId(tokenId: string): Promise<Session> {
    return this.sessionRepo.findOne({ condition: { tokenId } });
  }
}
