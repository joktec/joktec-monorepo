import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Tag } from '../../models/schemas';

@Injectable()
export class TagRepo extends MongoRepo<Tag, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Tag);
  }
}
