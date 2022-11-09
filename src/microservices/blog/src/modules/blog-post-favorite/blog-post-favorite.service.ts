import {
  BlogPostFavorite,
  BlogPostFavoriteDocument,
} from './schemas/blog-post-favorite.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogPostFavoriteService extends BaseService<BlogPostFavoriteDocument> {
  constructor(
    @InjectModel(BlogPostFavorite.name)
    private readonly mainModel: Model<BlogPostFavoriteDocument>,
  ) {
    super(mainModel);
  }
}
