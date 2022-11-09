import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSalaryTemplateDto } from './create-job-salary-template.dto';

export class UpdateJobSalaryTemplateDto extends PartialType(CreateJobSalaryTemplateDto) {}
