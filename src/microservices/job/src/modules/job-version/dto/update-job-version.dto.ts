import { PartialType } from '@nestjs/mapped-types';
import { CreateJobVersionDto } from './create-job-version.dto';

export class UpdateJobVersionDto extends PartialType(CreateJobVersionDto) {}
