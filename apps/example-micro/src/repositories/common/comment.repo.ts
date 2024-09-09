import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Comment } from '../../models/schemas';

@Injectable()
export class CommentRepo extends MongoRepo<Comment, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Comment);
  }
}
