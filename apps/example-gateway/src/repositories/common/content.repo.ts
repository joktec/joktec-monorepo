import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Content } from '../../models/schemas';

@Injectable()
export class ContentRepo extends MongoRepo<Content, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Content);
  }
}
