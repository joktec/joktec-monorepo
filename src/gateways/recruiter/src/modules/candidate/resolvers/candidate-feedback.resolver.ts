import {
  CommonMicroserviceConfig,
  GraphqlJwtAuthGuard,
  FeedbackMessagePattern,
  UserMessagePattern,
  UserMicroserviceConfig,
  generateRedisCacheKey,
  CacheTtlSeconds,
} from '@jobhopin/core';

import { BaseResolver } from '@jobhopin/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  Feedback,
  FeedbackListResponse,
  CreateFeedbackInput,
  FeedbackQueryInput,
  UpdateFeedbackInput,
} from '@jobhopin/graphql';
import { CandidateRedisKeyCache, FeedbackEnum } from 'src/constants';
import { Cacheable } from 'type-cacheable';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
const userMicroserviceConfig = new UserMicroserviceConfig();

@Resolver(() => Feedback)
@UseGuards(GraphqlJwtAuthGuard)
export class CandidateFeedbackResolver extends BaseResolver<
  CreateFeedbackInput,
  UpdateFeedbackInput,
  FeedbackQueryInput
>({
  viewDto: Feedback,
  createInput: CreateFeedbackInput,
  updateInput: UpdateFeedbackInput,
  listQueryInput: FeedbackQueryInput,
  listViewDto: FeedbackListResponse,
  name: 'candidateFeedback',
  pluralName: 'candidateFeedbacks',
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
    @Inject(userMicroserviceConfig.name)
    private readonly userMicroservice: ClientProxy,
  ) {
    super(commonMicroservice, FeedbackMessagePattern);
  }

  @Query(() => FeedbackListResponse, { name: 'candidateFeedbacks' })
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(CandidateRedisKeyCache.CANDIDATE_FEEDBACKS, args),

    ttlSeconds: CacheTtlSeconds.ONE_MINUTE / 2,
  })
  async findAll(
    @Args('query', {
      type: () => FeedbackQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: FeedbackQueryInput,
  ) {
    try {
      const newCondition = {
        ...query.condition,
        feedbackType: { $ne: FeedbackEnum.THUMB_DOWN },
      };

      return await firstValueFrom(
        this.commonMicroservice.send(FeedbackMessagePattern.LIST, {
          ...query,
          condition: newCondition,
        }),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField()
  async creator(@Parent() feedback) {
    try {
      if (!feedback) return null;
      if (!feedback?.actor) return null;

      const { items } = await firstValueFrom(
        this.userMicroservice.send(
          UserMessagePattern.LIST,

          { condition: { username: feedback?.actor } },
        ),
      );

      if (items?.length == 0) return null;

      return items[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}
