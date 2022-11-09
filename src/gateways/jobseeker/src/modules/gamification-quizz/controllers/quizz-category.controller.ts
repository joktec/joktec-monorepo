import {
  BaseController,
  CreateQuizzCategoryInput,
  QuizzCategoryDto,
  QuizzCategoryListReponseDto,
  QuizzCategoryMessagePattern,
  QuizzCategoryQueryInput,
  QuizzMicroserviceConfig,
  UpdateQuizzCategoryInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Controller('quizz-categories')
export class QuizzCategoryController extends BaseController<
  QuizzCategoryDto,
  CreateQuizzCategoryInput,
  UpdateQuizzCategoryInput,
  QuizzCategoryQueryInput,
  QuizzCategoryListReponseDto
> {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzCategoryMessagePattern);
  }
}
