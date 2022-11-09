import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerMarketValueDto } from './create-jobseeker_market_value.dto';

export class UpdateJobseekerMarketValueDto extends PartialType(CreateJobseekerMarketValueDto) {}
