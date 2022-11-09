import { firstValueFrom } from 'rxjs';
import {
  QuizzScoreLogMessagePattern,
  QuizzMicroserviceConfig,
  GraphqlJwtAuthGuard,
  CurrentUser,
} from '@jobhopin/core';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  QuizzScoreLog,
  CreateQuizzScoreLogInput,
  UpdateQuizzScoreLogInput,
  QuizzScoreLogQueryInput,
  QuizzScoreLogListReponse,
  QuizzScoreLogListRankingReponse,
  QuizzScoreLogRanking,
} from '@jobhopin/graphql';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();

@Resolver(() => QuizzScoreLog)
@UseGuards(GraphqlJwtAuthGuard)
export class QuizzScoreLogResolver extends BaseResolver<
  CreateQuizzScoreLogInput,
  UpdateQuizzScoreLogInput,
  QuizzScoreLogQueryInput
>({
  viewDto: QuizzScoreLog,
  createInput: CreateQuizzScoreLogInput,
  updateInput: UpdateQuizzScoreLogInput,
  listQueryInput: QuizzScoreLogQueryInput,
  listViewDto: QuizzScoreLogListReponse,
  name: 'quizzScoreLog',
  pluralName: 'quizzScoreLogs',
}) {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzScoreLogMessagePattern);
  }

  @Query(() => QuizzScoreLogListRankingReponse, {
    name: 'quizzScoreLogsRanking',
  })
  async ranking(
    @Args('query', { type: () => QuizzScoreLogQueryInput })
    query: QuizzScoreLogListRankingReponse,
  ) {
    const { condition, pagination } = query as any;
    return await firstValueFrom(
      this.baseMicroservice.send(QuizzScoreLogMessagePattern.RANKING, {
        condition,
        pagination,
      }),
    );
  }

  @Query(() => QuizzScoreLogListRankingReponse, {
    name: 'quizzScoreLogsRankingMe',
  })
  async rankingMe(
    @Args('query', { type: () => QuizzScoreLogQueryInput })
    query: QuizzScoreLogRanking,
    @CurrentUser() user,
  ) {
    const userId: string = user.id;
    const { condition, pagination } = query as any;
    return await firstValueFrom(
      this.baseMicroservice.send(QuizzScoreLogMessagePattern.RANKING, {
        condition: { ...condition, userId },
        pagination,
      }),
    );
  }
}
