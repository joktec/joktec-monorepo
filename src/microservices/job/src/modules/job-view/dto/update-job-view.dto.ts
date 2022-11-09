import { PartialType } from '@nestjs/mapped-types';
import { CreateJobViewDto } from './create-job-view.dto';

export class UpdateJobViewDto extends PartialType(CreateJobViewDto) {}
