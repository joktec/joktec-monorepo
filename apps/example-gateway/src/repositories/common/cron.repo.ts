import { Injectable } from '@joktec/core';
import { ICrontabRepo } from '@joktec/cron';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { CronSchema } from '../../models/schemas';

@Injectable()
export class CronRepo extends MongoRepo<CronSchema, string> implements ICrontabRepo<CronSchema, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, CronSchema);
  }
}
