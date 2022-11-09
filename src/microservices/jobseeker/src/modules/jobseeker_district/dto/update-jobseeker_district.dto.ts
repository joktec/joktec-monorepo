import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerDistrictDto } from './create-jobseeker_district.dto';

export class UpdateJobseekerDistrictDto extends PartialType(CreateJobseekerDistrictDto) {}
