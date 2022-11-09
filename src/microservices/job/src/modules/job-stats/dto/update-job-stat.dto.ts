import { PartialType } from '@nestjs/mapped-types';
import { CreateJobStatDto } from './create-job-stat.dto';

export class UpdateJobStatDto extends PartialType(CreateJobStatDto) {}
