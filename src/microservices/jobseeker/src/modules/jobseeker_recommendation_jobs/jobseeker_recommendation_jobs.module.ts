import { Module } from '@nestjs/common';
import { JobseekerRecommendationJobsService } from './jobseeker_recommendation_jobs.service';
import { JobseekerRecommendationJobsController } from './jobseeker_recommendation_jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerRecommendationJobs,
  JobseekerRecommendationJobsSchema,
} from './schemas/jobseeker_recommendation_jobs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerRecommendationJobs.name, schema: JobseekerRecommendationJobsSchema },
    ]),
  ],
  controllers: [JobseekerRecommendationJobsController],
  providers: [JobseekerRecommendationJobsService]
})
export class JobseekerRecommendationJobsModule {}
