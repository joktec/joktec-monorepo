import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopScoreNotificationMissingFieldsService } from './jobhop-scorenotification-missing-fields.service';
import { JobhopScoreNotificationMissingFieldsController } from './jobhop-scorenotification-missing-fields.controller';
import {
  JobhopScoreNotificationMissingFields,
  JobhopScoreNotificationMissingFieldsSchema,
} from './schemas/jobhop-scorenotification-missing-fields.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopScoreNotificationMissingFields.name,
        schema: JobhopScoreNotificationMissingFieldsSchema,
      },
    ]),
  ],
  controllers: [JobhopScoreNotificationMissingFieldsController],
  providers: [JobhopScoreNotificationMissingFieldsService],
})
export class JobhopScoreNotificationMissingFieldsModule {}
