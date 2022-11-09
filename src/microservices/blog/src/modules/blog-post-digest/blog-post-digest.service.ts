import {
  BlogPostDigest,
  BlogPostDigestDocument,
} from './schemas/blog-post-digest.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogPostDigestService extends BaseService<BlogPostDigestDocument> {
  constructor(
    @InjectModel(BlogPostDigest.name)
    private readonly mainModel: Model<BlogPostDigestDocument>,
  ) {
    super(mainModel);
  }
}
