import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopUserActivityDto } from './create-jobhop-useractivity.dto';

export class UpdateJobhopUserActivityDto extends PartialType(CreateJobhopUserActivityDto) {}
