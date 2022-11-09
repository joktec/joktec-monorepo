import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerEducationDto } from './create-jobseeker_education.dto';

export class UpdateJobseekerEducationDto extends PartialType(CreateJobseekerEducationDto) {}
