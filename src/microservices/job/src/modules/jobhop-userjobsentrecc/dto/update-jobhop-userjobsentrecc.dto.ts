import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopUserJobSentreccDto } from './create-jobhop-userjobsentrecc.dto';

export class UpdateJobhopUserJobSentreccDto extends PartialType(CreateJobhopUserJobSentreccDto) {}
