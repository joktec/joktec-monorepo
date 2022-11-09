import {
  JobhopScoreNotification,
  JobhopScoreNotificationSchema,
} from './schemas/jobhop-scorenotification.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopScoreNotificationService } from './jobhop-scorenotification.service';
import { JobhopScoreNotificationController } from './jobhop-scorenotification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopScoreNotification.name,
        schema: JobhopScoreNotificationSchema,
      },
    ]),
  ],
  controllers: [JobhopScoreNotificationController],
  providers: [JobhopScoreNotificationService],
})
export class JobhopScoreNotificationModule {}
