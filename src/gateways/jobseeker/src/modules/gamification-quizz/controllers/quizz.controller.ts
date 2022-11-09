import {
  BaseController,
  CreateQuizzInput,
  QuizzDto,
  QuizzListReponseDto,
  QuizzMessagePattern,
  QuizzMicroserviceConfig,
  QuizzQueryInput,
  UpdateQuizzInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Controller('quizzes')
export class QuizzController extends BaseController<
  QuizzDto,
  CreateQuizzInput,
  UpdateQuizzInput,
  QuizzQueryInput,
  QuizzListReponseDto
> {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzMessagePattern);
  }
}
