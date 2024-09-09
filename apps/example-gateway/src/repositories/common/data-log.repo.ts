import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { DataLog } from '../../models/schemas';

@Injectable()
export class DataLogRepo extends MongoRepo<DataLog, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, DataLog);
  }
}
