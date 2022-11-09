import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopScoreNotificationGroupService } from './jobhop-scorenotificationgroup.service';
import { JobhopScoreNotificationGroupController } from './jobhop-scorenotificationgroup.controller';
import {
  JobhopScoreNotificationGroup,
  JobhopScoreNotificationGroupSchema,
} from './schemas/jobhop-scorenotificationgroup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopScoreNotificationGroup.name,
        schema: JobhopScoreNotificationGroupSchema,
      },
    ]),
  ],
  controllers: [JobhopScoreNotificationGroupController],
  providers: [JobhopScoreNotificationGroupService],
})
export class JobhopScoreNotificationGroupModule {}
