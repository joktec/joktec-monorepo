import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopJobSettingDto } from './create-jobhop-jobsetting.dto';

export class UpdateJobhopJobSettingDto extends PartialType(CreateJobhopJobSettingDto) {}
