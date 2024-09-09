import { Cacheable, CacheTtlSeconds } from '@joktec/cacher';
import { Injectable, JwtPayload } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { AUTH_GUARD_NAMESPACE } from '../../app.constant';
import { UserRole } from '../../models/constants';
import { User } from '../../models/schemas';

@Injectable()
export class UserRepo extends MongoRepo<User, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, User);
  }

  @Cacheable(`${AUTH_GUARD_NAMESPACE}.user`, { expiry: CacheTtlSeconds.ONE_DAY, transform: User })
  async findByPayload(payload: JwtPayload): Promise<User> {
    return this.findById(payload.sub);
  }

  async findBizUsers(select: string = '_id'): Promise<User[]> {
    return this.find({ condition: { role: UserRole.BIZ }, select });
  }

  async preload(user: Partial<User>): Promise<User> {
    return this.findById(user._id);
  }

  async hiddenKeywords(userId: string, keywordId: string) {
    return this.model
      .findOneAndUpdate({ _id: userId, 'keywords._id': keywordId }, { $set: { 'keywords.$.hidden': true } })
      .exec();
  }
}
