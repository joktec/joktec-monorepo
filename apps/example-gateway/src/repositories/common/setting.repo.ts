import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Setting } from '../../models/entities';

@Injectable()
export class SettingRepo extends MongoRepo<Setting, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Setting);
  }
}
