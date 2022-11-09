import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerIndustryDto } from './create-jobseeker_industry.dto';

export class UpdateJobseekerIndustryDto extends PartialType(CreateJobseekerIndustryDto) {}
