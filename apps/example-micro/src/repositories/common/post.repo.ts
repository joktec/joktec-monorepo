import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Post } from '../../models/schemas';

@Injectable()
export class PostRepo extends MongoRepo<Post, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Post);
  }
}
