import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopEmailHistoryDto } from './create-jobhop-emailhistory.dto';

export class UpdateJobhopEmailHistoryDto extends PartialType(CreateJobhopEmailHistoryDto) {}
