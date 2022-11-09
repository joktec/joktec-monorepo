import { ThumbdownReasonEnum } from '@app/constants';
import {
  CommonMicroserviceConfig,
  LocationMessagePattern,
  ThumbdownReasonMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  ThumbdownReasonQueryInput,
  UpdateThumbdownReasonInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateThumbdownReasonInput,
  ThumbdownReason,
  ThumbdownReasonListResponse,
} from '@jobhopin/graphql';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => ThumbdownReason)
export class ThumbdownReasonResolver extends BaseResolver<
  CreateThumbdownReasonInput,
  UpdateThumbdownReasonInput,
  ThumbdownReasonQueryInput
>({
  viewDto: ThumbdownReason,
  createInput: CreateThumbdownReasonInput,
  updateInput: UpdateThumbdownReasonInput,
  listQueryInput: ThumbdownReasonQueryInput,
  listViewDto: ThumbdownReasonListResponse,
  name: ThumbdownReasonEnum.NAME,
  pluralName: ThumbdownReasonEnum.PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice, LocationMessagePattern);
  }

  @Query(() => ThumbdownReasonListResponse, {
    name: 'ThumbdownReasons',
  })
  async findAll(
    @Args('query', {
      type: () => ThumbdownReasonQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: ThumbdownReasonQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(ThumbdownReasonMessagePattern.LIST, query),
      );

      // {
      //   condition: {
      //     isActive: ThumbdownReasonEnum.ACTIVE,
      //     deleted: ThumbdownReasonEnum.NOT_DELETED,
      //   },
      //   pagination: {
      //     sortBy: ThumbdownReasonEnum.SORT_BY_ID,
      //   },
      // }
      return { items: items };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  async localizedName(@Parent() parent) {
    try {
      return { vi: parent.name, en: parent.nameEn };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
