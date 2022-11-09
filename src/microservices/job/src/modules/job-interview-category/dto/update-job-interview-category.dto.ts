import { PartialType } from '@nestjs/mapped-types';
import { CreateJobInterviewCategoryDto } from './create-job-interview-category.dto';

export class UpdateJobInterviewCategoryDto extends PartialType(CreateJobInterviewCategoryDto) {}
