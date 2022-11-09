import {
  BaseController,
  CreateQuizzQuestionMediaInput,
  QuizzMicroserviceConfig,
  QuizzQuestionMediaDto,
  QuizzQuestionMediaListReponseDto,
  QuizzQuestionMediaMessagePattern,
  QuizzQuestionMediaQueryInput,
  UpdateQuizzQuestionMediaInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Controller('quizz-question-medias')
export class QuizzQuestionMediaController extends BaseController<
  QuizzQuestionMediaDto,
  CreateQuizzQuestionMediaInput,
  UpdateQuizzQuestionMediaInput,
  QuizzQuestionMediaQueryInput,
  QuizzQuestionMediaListReponseDto
> {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzQuestionMediaMessagePattern);
  }
}
