import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Setting } from './models';

@Injectable()
export class SettingRepo extends MongoRepo<Setting, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Setting);
  }
}
