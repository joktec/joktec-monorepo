import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobGroupJobsService } from './jobgroup-jobs.service';
import { JobGroupJobsController } from './jobgroup-jobs.controller';
import {
  JobGroupJobs,
  JobGroupJobsSchema,
} from './schemas/jobgroup-jobs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobGroupJobs.name,
        schema: JobGroupJobsSchema,
      },
    ]),
  ],
  controllers: [JobGroupJobsController],
  providers: [JobGroupJobsService],
})
export class JobGroupJobsModule {}
