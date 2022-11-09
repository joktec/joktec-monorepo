import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerCvDto } from './create-jobseeker_cv.dto';

export class UpdateJobseekerCvDto extends PartialType(CreateJobseekerCvDto) {}
