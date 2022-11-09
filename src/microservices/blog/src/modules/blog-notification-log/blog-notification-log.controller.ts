import {
  BaseMicroserviceController,
  BlogNotificationLogMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { BlogNotificationLogService } from './blog-notification-log.service';

@Controller('blog-notification-log')
export class BlogNotificationLogController extends BaseMicroserviceController(
  BlogNotificationLogMessagePattern,
) {
  constructor(
    private readonly blogNotificationLogService: BlogNotificationLogService,
  ) {
    super(blogNotificationLogService);
  }
}
