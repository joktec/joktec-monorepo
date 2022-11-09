import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerJobExpectedDto } from './create-jobseeker_job_expected.dto';

export class UpdateJobseekerJobExpectedDto extends PartialType(CreateJobseekerJobExpectedDto) {}
