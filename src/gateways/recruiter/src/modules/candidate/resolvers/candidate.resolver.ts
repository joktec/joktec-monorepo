import {
  CacheTtlSeconds,
  CandidateCompanyTypeMessagePattern,
  CandidateFunctionMessagePattern,
  CandidateIndustryMessagePattern,
  CandidateLinkMessagePattern,
  CandidateLocationMessagePattern,
  CandidateMessagePattern,
  CandidateMicroserviceConfig,
  CurrentUser,
  CvMessagePattern,
  CvMicroserviceConfig,
  generateRedisCacheKey,
  GraphqlJwtAuthGuard,
} from '@jobhopin/core';

import {
  BaseResolver,
  CandidateQueryInput,
  CreateCandidateInput,
  UpdateCandidateInput,
} from '@jobhopin/graphql';

import { Inject, UseGuards } from '@nestjs/common';

import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ALLOWED_STATUS, CandidateRedisKeyCache, CV } from '../../../constants';
import { Cacheable } from 'type-cacheable';
import { Candidate, CandidateListReponse } from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
const cvMicroserviceConfig = new CvMicroserviceConfig();

// aiMatchScore = cos
// thumbdownCount = 0

@Resolver(() => Candidate)
@UseGuards(GraphqlJwtAuthGuard)
export class CandidateResolver extends BaseResolver<
  CreateCandidateInput,
  UpdateCandidateInput,
  CandidateQueryInput
>({
  viewDto: Candidate,
  createInput: CreateCandidateInput,
  updateInput: UpdateCandidateInput,
  listQueryInput: CandidateQueryInput,
  listViewDto: CandidateListReponse,
  name: 'candidate',
  pluralName: 'candidates',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,

    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateMessagePattern);
  }

  @Query(() => CandidateListReponse, { name: 'candidates' })
  @Cacheable({
    cacheKey: (args: any[]) => {
      const condition = args[0];
      const user = args[1];
      const platform = args[2]?.req?.headers['x-platform'];

      return generateRedisCacheKey(CandidateRedisKeyCache.CANDIDATE_LIST, [
        condition,
        user,
        platform,
      ]);
    },
    ttlSeconds: CacheTtlSeconds.ONE_MINUTE / 2,
  })
  async findAll(
    @Args('query', {
      type: () => CandidateQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: CandidateQueryInput,
    @CurrentUser() user,
    @Context() context,
  ) {
    try {
      const userId: string = user.id;

      const { condition, pagination } = query as any;

      const platform = context?.req?.headers['x-platform'];

      return await firstValueFrom(
        this.candidateMicroservice.send(CandidateMessagePattern.LIST, {
          condition: {
            ...condition,
            userId,
            platform,
          },
          pagination,
        }),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField()
  async allowedStatus(@Parent() candidate) {
    try {
      return ALLOWED_STATUS[candidate.status];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  async companyTypes(@Parent() candidate) {
    try {
      const { items } = await firstValueFrom(
        this.candidateMicroservice.send(
          CandidateCompanyTypeMessagePattern.LIST,
          { condition: { candidateId: candidate?._id } },
        ),
      );

      return items;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField()
  async functions(@Parent() candidate) {
    try {
      const { items } = await firstValueFrom(
        this.candidateMicroservice.send(CandidateFunctionMessagePattern.LIST, {
          condition: { candidateId: candidate?._id },
        }),
      );

      return items;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField()
  async industries(@Parent() candidate) {
    try {
      const { items } = await firstValueFrom(
        this.candidateMicroservice.send(CandidateIndustryMessagePattern.LIST, {
          condition: { candidateId: candidate?._id },
        }),
      );

      return items;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField()
  async locations(@Parent() candidate) {
    try {
      const { items } = await firstValueFrom(
        this.candidateMicroservice.send(CandidateLocationMessagePattern.LIST, {
          condition: { candidateId: candidate?._id },
        }),
      );

      return items;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField()
  async referralLinks(@Parent() candidate) {
    try {
      const { items } = await firstValueFrom(
        this.candidateMicroservice.send(CandidateLinkMessagePattern.LIST, {
          condition: { candidateId: candidate?._id },
        }),
      );

      return items;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField()
  async cvUncovered(@Parent() candidate) {
    try {
      const { items: cv } = await firstValueFrom(
        this.cvMicroservice.send(CvMessagePattern.LIST, {
          condition: { _id: candidate?.cvId },
        }),
      );

      if (cv && cv?.tags?.includes(CV.tags)) return true;

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => Candidate, { name: 'candidate' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await firstValueFrom(
      this.baseMicroservice.send(CandidateMessagePattern.GET, { id }),
    );
  }
}
