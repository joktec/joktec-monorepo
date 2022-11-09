import { PartialType } from '@nestjs/mapped-types';
import { CreateJobMatchDto } from './create-jobmatch.dto';

export class UpdateJobMatchDto extends PartialType(CreateJobMatchDto) {}
