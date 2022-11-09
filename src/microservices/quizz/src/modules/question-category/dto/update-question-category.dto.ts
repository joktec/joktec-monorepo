import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionCategoryDto } from './create-question-category.dto';

export class UpdateQuestionCategoryDto extends PartialType(CreateQuestionCategoryDto) {}
