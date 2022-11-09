import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopJobCategoryDto } from './create-jobhop-jobcategory.dto';

export class UpdateJobhopJobCategoryDto extends PartialType(CreateJobhopJobCategoryDto) {}
