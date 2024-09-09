import { BaseService, Injectable } from '@joktec/core';
import { Post } from '../../models/schemas';
import { PostRepo } from '../../repositories';

@Injectable()
export class PostService extends BaseService<Post, string> {
  constructor(protected postRepo: PostRepo) {
    super(postRepo);
  }
}
