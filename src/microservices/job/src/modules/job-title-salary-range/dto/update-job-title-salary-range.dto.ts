import { PartialType } from '@nestjs/mapped-types';
import { CreateJobTitleSalaryRangeDto } from './create-job-title-salary-range.dto';

export class UpdateJobTitleSalaryRangeDto extends PartialType(CreateJobTitleSalaryRangeDto) {}
