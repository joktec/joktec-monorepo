import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSearchDto } from './create-job-search.dto';

export class UpdateJobSearchDto extends PartialType(CreateJobSearchDto) {}
