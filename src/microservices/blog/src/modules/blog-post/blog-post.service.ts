import { BlogPost, BlogPostDocument } from './schemas/blog-post.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogPostService extends BaseService<BlogPostDocument> {
  constructor(
    @InjectModel(BlogPost.name)
    private readonly mainModel: Model<BlogPostDocument>,
  ) {
    super(mainModel);
  }
}
