import {
  GraphqlJwtAuthGuard,
  QuizzCategoryMessagePattern,
  QuizzMicroserviceConfig,
} from '@jobhopin/core';
import { Inject, UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  QuizzCategory,
  CreateQuizzCategoryInput,
  UpdateQuizzCategoryInput,
  QuizzCategoryQueryInput,
  QuizzCategoryListReponse,
} from '@jobhopin/graphql';
const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Resolver(() => QuizzCategory)
@UseGuards(GraphqlJwtAuthGuard)
export class QuizzCategoryResolver extends BaseResolver<
  CreateQuizzCategoryInput,
  UpdateQuizzCategoryInput,
  QuizzCategoryQueryInput
>({
  viewDto: QuizzCategory,
  createInput: CreateQuizzCategoryInput,
  updateInput: UpdateQuizzCategoryInput,
  listQueryInput: QuizzCategoryQueryInput,
  listViewDto: QuizzCategoryListReponse,
  name: 'quizzCategory',
  pluralName: 'quizzCategories',
}) {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzCategoryMessagePattern);
  }
}
