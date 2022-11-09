import { PartialType } from '@nestjs/mapped-types';
import { CreateJobCategoryDto } from './create-job-category.dto';

export class UpdateJobCategoryDto extends PartialType(CreateJobCategoryDto) {}
