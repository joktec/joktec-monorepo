import { Controller } from '@nestjs/common';
import { QuizzCategoryService } from './quizz-category.service';

@Controller()
export class QuizzCategoryController {
  constructor(private readonly quizzCategoryService: QuizzCategoryService) {}
}
