import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerActivityDateDto } from './create-jobseeker_activity_date.dto';

export class UpdateJobseekerActivityDateDto extends PartialType(CreateJobseekerActivityDateDto) {}
