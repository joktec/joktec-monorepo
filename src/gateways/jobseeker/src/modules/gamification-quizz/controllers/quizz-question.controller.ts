import {
  BaseController,
  CreateQuizzQuestionInput,
  QuizzMicroserviceConfig,
  QuizzQuestionDto,
  QuizzQuestionListReponseDto,
  QuizzQuestionMessagePattern,
  QuizzQuestionQueryInput,
  UpdateQuizzQuestionInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Controller('quizz-questions')
export class QuizzQuestionController extends BaseController<
  QuizzQuestionDto,
  CreateQuizzQuestionInput,
  UpdateQuizzQuestionInput,
  QuizzQuestionQueryInput,
  QuizzQuestionListReponseDto
> {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzQuestionMessagePattern);
  }
}
