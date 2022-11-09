import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerLocationDto } from './create-jobseeker_location.dto';

export class UpdateJobseekerLocationDto extends PartialType(CreateJobseekerLocationDto) {}
