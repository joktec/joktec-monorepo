import {
  JobhopUserScoreSentNotification,
  JobhopUserScoreSentNotificationSchema,
} from './schemas/jobhop-userscoresentnotification.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopUserScoreSentNotificationService } from './jobhop-userscoresentnotification.service';
import { JobhopUserScoreSentNotificationController } from './jobhop-userscoresentnotification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopUserScoreSentNotification.name,
        schema: JobhopUserScoreSentNotificationSchema,
      },
    ]),
  ],
  controllers: [JobhopUserScoreSentNotificationController],
  providers: [JobhopUserScoreSentNotificationService],
})
export class JobhopUserScoreSentNotificationModule {}
