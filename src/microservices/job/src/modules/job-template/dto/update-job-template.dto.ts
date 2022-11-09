import { PartialType } from '@nestjs/mapped-types';
import { CreateJobTemplateDto } from './create-job-template.dto';

export class UpdateJobTemplateDto extends PartialType(CreateJobTemplateDto) {}
