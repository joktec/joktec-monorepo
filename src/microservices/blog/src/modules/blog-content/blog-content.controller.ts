import {
  BaseMicroserviceController,
  BlogContentMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { BlogContentService } from './blog-content.service';

@Controller('blog-content')
export class BlogContentController extends BaseMicroserviceController(
  BlogContentMessagePattern,
) {
  constructor(private readonly blogContentService: BlogContentService) {
    super(blogContentService);
  }
}
