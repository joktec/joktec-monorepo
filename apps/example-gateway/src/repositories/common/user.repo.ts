import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { User } from '../../models/entities';

@Injectable()
export class UserRepo extends MongoRepo<User, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, User);
  }
}
