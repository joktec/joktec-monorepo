import {
  BlogNotificationLog,
  BlogNotificationLogSchema,
} from './schemas/blog-notification-log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogNotificationLogService } from './blog-notification-log.service';
import { BlogNotificationLogController } from './blog-notification-log.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogNotificationLog.name, schema: BlogNotificationLogSchema },
    ]),
  ],
  controllers: [BlogNotificationLogController],
  providers: [BlogNotificationLogService],
})
export class BlogNotificationLogModule {}
