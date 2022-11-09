import { PartialType } from '@nestjs/mapped-types';
import { CreateJobTypeDto } from './create-job-type.dto';

export class UpdateJobTypeDto extends PartialType(CreateJobTypeDto) {}
