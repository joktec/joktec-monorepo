import { PartialType } from '@nestjs/mapped-types';
import { CreateJobStatsDetailDto } from './create-job-stats-detail.dto';

export class UpdateJobStatsDetailDto extends PartialType(CreateJobStatsDetailDto) {}
