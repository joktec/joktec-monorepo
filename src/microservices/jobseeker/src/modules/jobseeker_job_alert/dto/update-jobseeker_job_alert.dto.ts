import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerJobAlertDto } from './create-jobseeker_job_alert.dto';

export class UpdateJobseekerJobAlertDto extends PartialType(CreateJobseekerJobAlertDto) {}
