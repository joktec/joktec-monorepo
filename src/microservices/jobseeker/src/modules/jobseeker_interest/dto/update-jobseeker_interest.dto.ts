import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerInterestDto } from './create-jobseeker_interest.dto';

export class UpdateJobseekerInterestDto extends PartialType(CreateJobseekerInterestDto) {}
