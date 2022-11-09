import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopJobAtsActivityDto } from './create-jobhop-jobatsactivity.dto';

export class UpdateJobhopJobAtsActivityDto extends PartialType(CreateJobhopJobAtsActivityDto) {}
