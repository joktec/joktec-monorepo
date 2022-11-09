import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopScoreNotificationMissingFieldService } from './jobhop-scorenotificationmissingfield.service';
import { JobhopScoreNotificationMissingFieldController } from './jobhop-scorenotificationmissingfield.controller';
import {
  JobhopScoreNotificationMissingField,
  JobhopScoreNotificationMissingFieldSchema,
} from './schemas/jobhop-scorenotificationmissingfield.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopScoreNotificationMissingField.name,
        schema: JobhopScoreNotificationMissingFieldSchema,
      },
    ]),
  ],
  controllers: [JobhopScoreNotificationMissingFieldController],
  providers: [JobhopScoreNotificationMissingFieldService],
})
export class JobhopScoreNotificationMissingFieldModule {}
