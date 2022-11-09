import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopNotiMessageDetailDto } from './create-jobhop-notimessagedetail.dto';

export class UpdateJobhopNotiMessageDetailDto extends PartialType(CreateJobhopNotiMessageDetailDto) {}
