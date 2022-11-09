import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerJobSavedDto } from './create-jobseeker_job_saved.dto';

export class UpdateJobseekerJobSavedDto extends PartialType(CreateJobseekerJobSavedDto) {}
