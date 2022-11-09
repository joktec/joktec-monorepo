import {
  GraphqlJwtAuthGuard,
  CandidateFeedbackItemMessagePattern,
  generateRedisCacheKey,
  CacheTtlSeconds,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';

import { BaseResolver } from '@jobhopin/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  FeedbackItem,
  FeedbackItemListResponse,
  CreateFeedbackItemInput,
  FeedbackItemQueryInput,
  UpdateFeedbackItemInput,
} from '@jobhopin/graphql';
import { CandidateRedisKeyCache } from 'src/constants';
import { Cacheable } from 'type-cacheable';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();

@Resolver(() => FeedbackItem)
@UseGuards(GraphqlJwtAuthGuard)
export class CandidateFeedbackItemResolver extends BaseResolver<
  CreateFeedbackItemInput,
  UpdateFeedbackItemInput,
  FeedbackItemQueryInput
>({
  viewDto: FeedbackItem,
  createInput: CreateFeedbackItemInput,
  updateInput: UpdateFeedbackItemInput,
  listQueryInput: FeedbackItemQueryInput,
  listViewDto: FeedbackItemListResponse,
  name: 'candidateFeedbackItem',
  pluralName: 'candidateFeedbackItems',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackItemMessagePattern);
  }

  @Query(() => FeedbackItemListResponse, { name: 'candidateFeedbackItems' })
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(
        CandidateRedisKeyCache.CANDIDATE_FEEDBACK_ITEMS,
        args,
      ),

    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async findAll(
    @Args('query', {
      type: () => FeedbackItemQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: FeedbackItemQueryInput,
  ) {
    try {
      return await firstValueFrom(
        this.candidateMicroservice.send(
          CandidateFeedbackItemMessagePattern.LIST,
          query,
        ),
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
