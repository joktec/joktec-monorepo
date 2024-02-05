import { BaseService, Injectable } from '@joktec/core';
import { Session } from '../../models/entities';
import { SessionRepo } from '../../repositories';

@Injectable()
export class SessionService extends BaseService<Session, string> {
  constructor(protected sessionRepo: SessionRepo) {
    super(sessionRepo);
  }

  async findByTokenId(tokenId: string): Promise<Session> {
    return this.sessionRepo.findByTokenId(tokenId);
  }
}
