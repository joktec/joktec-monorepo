import { PartialType } from '@nestjs/mapped-types';
import { CreateJobgroupJobDto } from './create-jobgroup-job.dto';

export class UpdateJobgroupJobDto extends PartialType(CreateJobgroupJobDto) {}
