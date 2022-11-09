import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerJobReferralDto } from './create-jobseeker_job_referral.dto';

export class UpdateJobseekerJobReferralDto extends PartialType(CreateJobseekerJobReferralDto) {}
