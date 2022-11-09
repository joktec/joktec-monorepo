import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerReferenceDto } from './create-jobseeker_reference.dto';

export class UpdateJobseekerReferenceDto extends PartialType(CreateJobseekerReferenceDto) {}
