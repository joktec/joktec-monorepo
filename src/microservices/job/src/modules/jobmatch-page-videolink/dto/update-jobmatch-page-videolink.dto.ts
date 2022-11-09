import { PartialType } from '@nestjs/mapped-types';
import { CreateJobMatchPageVideolinkDto } from './create-jobmatch-page-videolink.dto';

export class UpdateJobMatchPageVideolinkDto extends PartialType(CreateJobMatchPageVideolinkDto) {}
