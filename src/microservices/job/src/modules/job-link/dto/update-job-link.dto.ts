import { PartialType } from '@nestjs/mapped-types';
import { CreateJobLinkDto } from './create-job-link.dto';

export class UpdateJobLinkDto extends PartialType(CreateJobLinkDto) {}
