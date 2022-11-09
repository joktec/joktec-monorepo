import {
  BaseController,
  CreateQuizzEventInput,
  QuizzEventDto,
  QuizzEventListReponseDto,
  QuizzEventMessagePattern,
  QuizzEventQueryInput,
  QuizzMicroserviceConfig,
  UpdateQuizzEventInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Controller('quizz-events')
export class QuizzEventController extends BaseController<
  QuizzEventDto,
  CreateQuizzEventInput,
  UpdateQuizzEventInput,
  QuizzEventQueryInput,
  QuizzEventListReponseDto
> {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzEventMessagePattern);
  }
}
