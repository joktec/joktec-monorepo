import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerTitlecaseDto } from './create-jobseeker_titlecase.dto';

export class UpdateJobseekerTitlecaseDto extends PartialType(CreateJobseekerTitlecaseDto) {}
