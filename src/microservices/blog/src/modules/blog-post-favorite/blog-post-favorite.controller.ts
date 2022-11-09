import {
  BaseMicroserviceController,
  BlogPostFavoriteMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { BlogPostFavoriteService } from './blog-post-favorite.service';

@Controller('blog-post-favorite')
export class BlogPostFavoriteController extends BaseMicroserviceController(
  BlogPostFavoriteMessagePattern,
) {
  constructor(
    private readonly blogPostFavoriteService: BlogPostFavoriteService,
  ) {
    super(blogPostFavoriteService);
  }
}
