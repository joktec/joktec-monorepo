import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerDirectlyApplyDto } from './create-jobseeker_directly_apply.dto';

export class UpdateJobseekerDirectlyApplyDto extends PartialType(CreateJobseekerDirectlyApplyDto) {}
