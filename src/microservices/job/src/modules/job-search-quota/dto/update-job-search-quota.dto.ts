import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSearchQuotaDto } from './create-job-search-quota.dto';

export class UpdateJobSearchQuotaDto extends PartialType(CreateJobSearchQuotaDto) {}
