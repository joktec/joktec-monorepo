import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { CronSchema } from '../../models/schemas';

@Injectable()
export class CronRepo extends MongoRepo<CronSchema, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, CronSchema);
  }
}
