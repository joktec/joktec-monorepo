import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopJobAtsActivityService } from './jobhop-jobatsactivity.service';
import { JobhopJobAtsActivityController } from './jobhop-jobatsactivity.controller';
import {
  JobhopJobAtsActivity,
  JobhopJobAtsActivitySchema,
} from './schemas/jobhop-jobatsactivity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopJobAtsActivity.name,
        schema: JobhopJobAtsActivitySchema,
      },
    ]),
  ],
  controllers: [JobhopJobAtsActivityController],
  providers: [JobhopJobAtsActivityService],
})
export class JobhopJobAtsActivityModule {}
