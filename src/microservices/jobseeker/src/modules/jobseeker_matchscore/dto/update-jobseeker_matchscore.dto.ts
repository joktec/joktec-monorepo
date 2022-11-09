import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerMatchscoreDto } from './create-jobseeker_matchscore.dto';

export class UpdateJobseekerMatchscoreDto extends PartialType(CreateJobseekerMatchscoreDto) {}
