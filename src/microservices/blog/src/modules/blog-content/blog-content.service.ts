import {
  BlogContent,
  BlogContentDocument,
} from './schemas/blog-content.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogContentService extends BaseService<BlogContentDocument> {
  constructor(
    @InjectModel(BlogContent.name)
    private readonly mainModel: Model<BlogContentDocument>,
  ) {
    super(mainModel);
  }
}
