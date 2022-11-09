import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerRecommendationJobDto } from './create-jobseeker_recommendation_job.dto';

export class UpdateJobseekerRecommendationJobDto extends PartialType(CreateJobseekerRecommendationJobDto) {}
