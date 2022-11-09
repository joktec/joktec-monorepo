import { firstValueFrom } from 'rxjs';
import {
  QuizzMatchLogMessagePattern,
  QuizzMessagePattern,
  QuizzMicroserviceConfig,
  GraphqlJwtAuthGuard,
  CurrentUser,
} from '@jobhopin/core';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  QuizzMatchLog,
  CreateQuizzMatchLogInput,
  UpdateQuizzMatchLogInput,
  QuizzMatchLogQueryInput,
  QuizzMatchLogListReponse,
} from '@jobhopin/graphql';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Resolver(() => QuizzMatchLog)
@UseGuards(GraphqlJwtAuthGuard)
export class QuizzMatchLogResolver extends BaseResolver<
  CreateQuizzMatchLogInput,
  UpdateQuizzMatchLogInput,
  QuizzMatchLogQueryInput
>({
  viewDto: QuizzMatchLog,
  createInput: CreateQuizzMatchLogInput,
  updateInput: UpdateQuizzMatchLogInput,
  listQueryInput: QuizzMatchLogQueryInput,
  listViewDto: QuizzMatchLogListReponse,
  name: 'quizzMatchLog',
  pluralName: 'quizzMatchLogs',
}) {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzMatchLogMessagePattern);
  }

  @Query(() => QuizzMatchLogListReponse, { name: 'quizzMatchLogMe' })
  async quizzMatchLogMe(
    @Args('query', { type: () => QuizzMatchLogQueryInput })
    query: QuizzMatchLogQueryInput,
    @CurrentUser() user,
  ) {
    const userId: string = user.id;
    const { condition, pagination } = query as any;
    return await firstValueFrom(
      this.baseMicroservice.send('QuizzMatchLogMessagePattern_MATCH_LOG_ME', {
        condition: { ...condition, userId },
        pagination,
      }),
    );
  }

  @ResolveField()
  async quiz(@Parent() quizzMatchLog: QuizzMatchLog) {
    try {
      return await firstValueFrom(
        this.quizzMicroservice.send(QuizzMessagePattern.GET, {
          id: quizzMatchLog.quiz,
        }),
      );
    } catch {
      return null;
    }
  }
}
