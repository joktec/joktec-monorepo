import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerJobTypeDto } from './create-jobseeker_job_type.dto';

export class UpdateJobseekerJobTypeDto extends PartialType(CreateJobseekerJobTypeDto) {}
