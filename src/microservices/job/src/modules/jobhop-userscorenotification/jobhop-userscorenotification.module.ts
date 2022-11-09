import {
  JobhopUserScoreNotification,
  JobhopUserScoreNotificationSchema,
} from './schemas/jobhop-userscorenotification.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopUserScoreNotificationService } from './jobhop-userscorenotification.service';
import { JobhopUserScoreNotificationController } from './jobhop-userscorenotification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopUserScoreNotification.name,
        schema: JobhopUserScoreNotificationSchema,
      },
    ]),
  ],
  controllers: [JobhopUserScoreNotificationController],
  providers: [JobhopUserScoreNotificationService],
})
export class JobhopUserScoreNotificationModule {}
