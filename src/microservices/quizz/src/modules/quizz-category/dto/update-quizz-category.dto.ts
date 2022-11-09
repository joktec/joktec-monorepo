import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzCategoryDto } from './create-quizz-category.dto';

export class UpdateQuizzCategoryDto extends PartialType(CreateQuizzCategoryDto) {}
