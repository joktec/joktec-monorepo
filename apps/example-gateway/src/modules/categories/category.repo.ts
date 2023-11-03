import { Injectable } from '@joktec/core';
import { IMongoRequest, MongoRepo, MongoService } from '@joktec/mongo';
import { Category } from './models';

@Injectable()
export class CategoryRepo extends MongoRepo<Category, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Category);
  }

  async find(query: IMongoRequest<Category>): Promise<Category[]> {
    return super.find({
      ...query,
    });
  }
}
