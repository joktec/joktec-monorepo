import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerCityDto } from './create-jobseeker_city.dto';

export class UpdateJobseekerCityDto extends PartialType(CreateJobseekerCityDto) {}
