import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerWorkExperienceDto } from './create-jobseeker_work_experience.dto';

export class UpdateJobseekerWorkExperienceDto extends PartialType(CreateJobseekerWorkExperienceDto) {}
