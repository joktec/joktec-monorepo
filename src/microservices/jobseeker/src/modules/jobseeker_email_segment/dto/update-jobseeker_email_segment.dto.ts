import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerEmailSegmentDto } from './create-jobseeker_email_segment.dto';

export class UpdateJobseekerEmailSegmentDto extends PartialType(CreateJobseekerEmailSegmentDto) {}
