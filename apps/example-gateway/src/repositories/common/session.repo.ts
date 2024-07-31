import { Cacheable, CacheTtlSeconds } from '@joktec/cacher';
import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { AUTH_GUARD_NAMESPACE } from '../../app.constant';
import { Session } from '../../models/entities';

@Injectable()
export class SessionRepo extends MongoRepo<Session, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Session);
  }

  @Cacheable<Session>(`${AUTH_GUARD_NAMESPACE}.session`, { expiry: CacheTtlSeconds.ONE_DAY })
  async findByTokenId(tokenId: string): Promise<Session> {
    return this.findOne({ condition: { tokenId } });
  }
}
