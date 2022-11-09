import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopJobMatchCounterDto } from './create-jobhop-jobmatchcounter.dto';

export class UpdateJobhopJobMatchCounterDto extends PartialType(CreateJobhopJobMatchCounterDto) {}
