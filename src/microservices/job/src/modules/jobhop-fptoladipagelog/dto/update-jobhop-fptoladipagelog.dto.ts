import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopFptoLadipageLogDto } from './create-jobhop-fptoladipagelog.dto';

export class UpdateJobhopFptoLadipageLogDto extends PartialType(CreateJobhopFptoLadipageLogDto) {}
