import {
  BaseMicroserviceController,
  QuestionCategoryMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuestionCategoryService } from './question-category.service';

@Controller('questionCategory')
export class QuestionCategoryController extends BaseMicroserviceController(
  QuestionCategoryMessagePattern,
) {
  constructor(private readonly questionCategoryService: QuestionCategoryService) {
    super(questionCategoryService);
  }
}
