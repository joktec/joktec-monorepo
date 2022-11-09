import { PartialType } from '@nestjs/mapped-types';
import { CreateJobGroupDto } from './create-jobgroup.dto';

export class UpdateJobGroupDto extends PartialType(CreateJobGroupDto) {}
