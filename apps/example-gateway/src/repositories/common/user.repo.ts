import { Cacheable, CacheTtlSeconds } from '@joktec/cacher';
import { Injectable, JwtPayload } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { AUTH_GUARD_NAMESPACE } from '../../app.constant';
import { User } from '../../models/entities';

@Injectable()
export class UserRepo extends MongoRepo<User, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, User);
  }

  @Cacheable<User>(`${AUTH_GUARD_NAMESPACE}.user`, { expiry: CacheTtlSeconds.ONE_DAY })
  async findByPayload(payload: JwtPayload): Promise<User> {
    return this.findById(payload.sub);
  }
}
