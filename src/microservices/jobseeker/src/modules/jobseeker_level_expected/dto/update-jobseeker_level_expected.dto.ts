import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerLevelExpectedDto } from './create-jobseeker_level_expected.dto';

export class UpdateJobseekerLevelExpectedDto extends PartialType(CreateJobseekerLevelExpectedDto) {}
