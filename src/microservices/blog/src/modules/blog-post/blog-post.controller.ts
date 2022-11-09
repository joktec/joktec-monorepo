import {
  BaseMicroserviceController,
  BlogPostMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';

@Controller('blog-post')
export class BlogPostController extends BaseMicroserviceController(
  BlogPostMessagePattern,
) {
  constructor(private readonly blogPostService: BlogPostService) {
    super(blogPostService);
  }
}
