import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Article } from '../../models/schemas';

@Injectable()
export class ArticleRepo extends MongoRepo<Article, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Article);
  }

  async bulkWrite(docs: any[], opts?: any): Promise<any> {
    return this.model.bulkWrite(docs, opts);
  }
}
