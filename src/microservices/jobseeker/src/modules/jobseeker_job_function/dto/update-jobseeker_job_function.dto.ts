import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerJobFunctionDto } from './create-jobseeker_job_function.dto';

export class UpdateJobseekerJobFunctionDto extends PartialType(CreateJobseekerJobFunctionDto) {}
