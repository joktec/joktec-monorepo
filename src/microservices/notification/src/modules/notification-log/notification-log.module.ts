import {
  NotificationLog,
  NotificationLogSchema,
} from './schemas/notification-log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NotificationLogService } from './notification-log.service';
import { NotificationLogController } from './notification-log.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NotificationLog.name,
        schema: NotificationLogSchema,
      },
    ]),
  ],
  controllers: [NotificationLogController],
  providers: [NotificationLogService],
})
export class NotificationLogModule {}
