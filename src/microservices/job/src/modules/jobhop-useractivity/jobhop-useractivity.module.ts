import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopUserActivityService } from './jobhop-useractivity.service';
import { JobhopUserActivityController } from './jobhop-useractivity.controller';
import {
  JobhopUserActivity,
  JobhopUserActivitySchema,
} from './schemas/jobhop-useractivity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopUserActivity.name,
        schema: JobhopUserActivitySchema,
      },
    ]),
  ],
  controllers: [JobhopUserActivityController],
  providers: [JobhopUserActivityService],
})
export class JobhopUserActivityModule {}
