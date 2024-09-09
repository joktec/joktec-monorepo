import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { CronHistory } from '../../models/schemas';

@Injectable()
export class CronHistoryRepo extends MongoRepo<CronHistory, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, CronHistory);
  }
}
