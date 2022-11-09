import {
  BaseMicroserviceController,
  BlogPostDigestMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { BlogPostDigestService } from './blog-post-digest.service';

@Controller('blog-post-digest')
export class BlogPostDigestController extends BaseMicroserviceController(
  BlogPostDigestMessagePattern,
) {
  constructor(private readonly blogPostDigestService: BlogPostDigestService) {
    super(blogPostDigestService);
  }
}
