import { PartialType } from '@nestjs/mapped-types';
import { CreateJobThumdownReasonDto } from './create-job-thumdown-reason.dto';

export class UpdateJobThumdownReasonDto extends PartialType(CreateJobThumdownReasonDto) {}
