import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Article, Block, User } from '../../models/schemas';

@Injectable()
export class BlockRepo extends MongoRepo<Block, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Block);
  }

  async findArticleBlock(userId: string, select: string = 'targetId'): Promise<Block[]> {
    return this.find({ condition: { authorId: userId, target: Article.name }, select });
  }

  async findUserBlock(userId: string, select: string = 'targetId'): Promise<Block[]> {
    return this.find({ condition: { authorId: userId, target: User.name }, select });
  }
}
