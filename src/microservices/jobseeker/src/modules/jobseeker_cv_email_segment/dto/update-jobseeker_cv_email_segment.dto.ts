import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerCvEmailSegmentDto } from './create-jobseeker_cv_email_segment.dto';

export class UpdateJobseekerCvEmailSegmentDto extends PartialType(CreateJobseekerCvEmailSegmentDto) {}
