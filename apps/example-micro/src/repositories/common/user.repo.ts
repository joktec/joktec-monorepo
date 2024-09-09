import { Injectable, toInt } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { UserKeyword } from '../../models/objects';
import { User } from '../../models/schemas';

@Injectable()
export class UserRepo extends MongoRepo<User, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, User);
  }

  async updateKeyword(userId: string, userKeyword: UserKeyword) {
    return this.model
      .findOneAndUpdate(
        { _id: userId, 'keywords._id': userKeyword._id },
        {
          $set: {
            'keywords.$.lastSearchAt': userKeyword.lastSearchAt,
            'keywords.$.count': toInt(userKeyword.count, 1),
            'keywords.$.hidden': userKeyword.hidden,
          },
        },
      )
      .exec();
  }
}
