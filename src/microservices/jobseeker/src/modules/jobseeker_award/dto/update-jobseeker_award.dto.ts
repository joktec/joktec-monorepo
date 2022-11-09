import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerAwardDto } from './create-jobseeker_award.dto';

export class UpdateJobseekerAwardDto extends PartialType(CreateJobseekerAwardDto) {}
