import {
  BaseController,
  CreateQuizzQuestionAnswerInput,
  QuizzMicroserviceConfig,
  QuizzQuestionAnswerDto,
  QuizzQuestionAnswerListReponseDto,
  QuizzQuestionAnswerMessagePattern,
  QuizzQuestionAnswerQueryInput,
  UpdateQuizzQuestionAnswerInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Controller('quizz-question-answers')
export class QuizzQuestionAnswerController extends BaseController<
  QuizzQuestionAnswerDto,
  CreateQuizzQuestionAnswerInput,
  UpdateQuizzQuestionAnswerInput,
  QuizzQuestionAnswerQueryInput,
  QuizzQuestionAnswerListReponseDto
> {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzQuestionAnswerMessagePattern);
  }
}
