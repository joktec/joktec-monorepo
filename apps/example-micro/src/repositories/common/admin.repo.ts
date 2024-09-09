import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Admin } from '../../models/schemas';

@Injectable()
export class AdminRepo extends MongoRepo<Admin, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Admin);
  }
}
