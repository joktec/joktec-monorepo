import {
  QuizzQuestionAnswerMessagePattern,
  QuizzMicroserviceConfig,
  GraphqlJwtAuthGuard,
} from '@jobhopin/core';
import { Inject, UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  QuizzQuestionAnswer,
  CreateQuizzQuestionAnswerInput,
  UpdateQuizzQuestionAnswerInput,
  QuizzQuestionAnswerQueryInput,
  QuizzQuestionAnswerListReponse,
} from '@jobhopin/graphql';
const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Resolver(() => QuizzQuestionAnswer)
@UseGuards(GraphqlJwtAuthGuard)
export class QuizzQuestionAnswerResolver extends BaseResolver<
  CreateQuizzQuestionAnswerInput,
  UpdateQuizzQuestionAnswerInput,
  QuizzQuestionAnswerQueryInput
>({
  viewDto: QuizzQuestionAnswer,
  createInput: CreateQuizzQuestionAnswerInput,
  updateInput: UpdateQuizzQuestionAnswerInput,
  listQueryInput: QuizzQuestionAnswerQueryInput,
  listViewDto: QuizzQuestionAnswerListReponse,
  name: 'quizzQuestionAnswer',
  pluralName: 'quizzQuestionAnswers',
}) {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzQuestionAnswerMessagePattern);
  }
}
