import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopJobDefaultImageDto } from './create-jobhop-jobdefaultimage.dto';

export class UpdateJobhopJobDefaultImageDto extends PartialType(CreateJobhopJobDefaultImageDto) {}
