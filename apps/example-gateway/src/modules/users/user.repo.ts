import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { User } from './models';

@Injectable()
export class UserRepo extends MongoRepo<User, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, User);
  }

  async findById(userId: string) {
    return this.findOne({ condition: { _id: userId } });
  }
}
