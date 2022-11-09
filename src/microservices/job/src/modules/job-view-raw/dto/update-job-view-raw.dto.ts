import { PartialType } from '@nestjs/mapped-types';
import { CreateJobViewRawDto } from './create-job-view-raw.dto';

export class UpdateJobViewRawDto extends PartialType(CreateJobViewRawDto) {}
