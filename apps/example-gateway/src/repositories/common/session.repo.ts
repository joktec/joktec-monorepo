import { Cacheable, CacheTtlSeconds } from '@joktec/cacher';
import { Injectable, JwtPayload } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { AUTH_GUARD_NAMESPACE } from '../../app.constant';
import { Session } from '../../models/schemas';

@Injectable()
export class SessionRepo extends MongoRepo<Session, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Session);
  }

  @Cacheable(`${AUTH_GUARD_NAMESPACE}.session`, { expiry: CacheTtlSeconds.ONE_DAY, transform: Session })
  async findByPayload(payload: JwtPayload): Promise<Session> {
    return this.findOne({ tokenId: payload.jti });
  }
}
