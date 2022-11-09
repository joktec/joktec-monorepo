import { firstValueFrom } from 'rxjs';
import {
  QuizzQuestionMessagePattern,
  QuizzMicroserviceConfig,
  QuizzQuestionAnswerMessagePattern,
  QuizzQuestionMediaMessagePattern,
  GraphqlJwtAuthGuard,
  CurrentUser,
  MysqlMicroserviceConfig,
} from '@jobhopin/core';
import { Inject, UseGuards } from '@nestjs/common';
import {
  ResolveField,
  Resolver,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  QuizzQuestion,
  CreateQuizzQuestionInput,
  UpdateQuizzQuestionInput,
  QuizzQuestionQueryInput,
  QuizzQuestionListReponse,
} from '@jobhopin/graphql';
import { AnswerQuestionInput } from './inputs';
import { AnswerQuestionResponse } from './typedefs';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();
const mysqlMicroserviceConfig = new MysqlMicroserviceConfig();

@Resolver(() => QuizzQuestion)
@UseGuards(GraphqlJwtAuthGuard)
export class QuizzQuestionResolver extends BaseResolver<
  CreateQuizzQuestionInput,
  UpdateQuizzQuestionInput,
  QuizzQuestionQueryInput
>({
  viewDto: QuizzQuestion,
  createInput: CreateQuizzQuestionInput,
  updateInput: UpdateQuizzQuestionInput,
  listQueryInput: QuizzQuestionQueryInput,
  listViewDto: QuizzQuestionListReponse,
  name: 'quizzQuestion',
  pluralName: 'quizzQuestions',
}) {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
    @Inject(mysqlMicroserviceConfig.name)
    private readonly mysqlMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzQuestionMessagePattern);
  }

  @ResolveField()
  async answers(@Parent() quizzQuestion: QuizzQuestion) {
    try {
      const { items } = await firstValueFrom(
        this.quizzMicroservice.send(QuizzQuestionAnswerMessagePattern.LIST, {
          condition: {
            question: quizzQuestion._id,
          },
        }),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  async medias(@Parent() quizzQuestion: QuizzQuestion) {
    try {
      const { items } = await firstValueFrom(
        this.quizzMicroservice.send(QuizzQuestionMediaMessagePattern.LIST, {
          condition: {
            question: quizzQuestion._id,
          },
        }),
      );
      return items;
    } catch (error){
      throw new Error(error.message);
    }
  }

  @Mutation(() => AnswerQuestionResponse, { name: 'answerQuestion' })
  async answerQuestionQuizz(
    @Args('input')
    input: AnswerQuestionInput,
    @CurrentUser() user,
  ) {
    const userId = user.id;
    return await firstValueFrom(
      this.mysqlMicroservice.send(QuizzQuestionMessagePattern.ANSWER, {
        ...input,
        userId,
      }),
    );
  }
}
