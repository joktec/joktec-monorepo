import {
  BaseMicroserviceController,
  QuizzCategoryMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzCategoryService } from './quizz-category.service';

@Controller('quizz-category')
export class QuizzCategoryController extends BaseMicroserviceController(
  QuizzCategoryMessagePattern,
) {
  constructor(private readonly quizzCategoryService: QuizzCategoryService) {
    super(quizzCategoryService);
  }
}
