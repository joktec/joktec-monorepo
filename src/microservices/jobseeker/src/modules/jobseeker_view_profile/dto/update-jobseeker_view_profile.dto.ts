import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerViewProfileDto } from './create-jobseeker_view_profile.dto';

export class UpdateJobseekerViewProfileDto extends PartialType(CreateJobseekerViewProfileDto) {}
