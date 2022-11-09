import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopJobLocationDto } from './create-jobhop-joblocation.dto';

export class UpdateJobhopJobLocationDto extends PartialType(CreateJobhopJobLocationDto) {}
