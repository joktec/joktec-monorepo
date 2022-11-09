import { PartialType } from '@nestjs/mapped-types';
import { CreateJobFavoriteDto } from './create-job-favorite.dto';

export class UpdateJobFavoriteDto extends PartialType(CreateJobFavoriteDto) {}
