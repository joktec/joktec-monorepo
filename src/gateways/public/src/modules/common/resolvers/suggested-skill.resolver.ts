import { SuggestedSkillEnum } from '@app/constants';
import {
  CommonMicroserviceConfig,
  SuggestedSkillMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  SuggestedSkill,
  SuggestedSkillListResponse,
  SuggestedSkillQueryInput,
  SuggestedSkillSearchAutocomplete,
  SuggestedSkillSearchAutocompleteQueryInput
} from '@jobhopin/graphql';

import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => SuggestedSkill)
export class SuggestedSkillResolver extends BaseResolver<
  null,
  null,
  SuggestedSkillQueryInput
>({
  viewDto: SuggestedSkill,
  createInput: null,
  updateInput: null,
  listQueryInput: SuggestedSkillQueryInput,
  listViewDto: SuggestedSkillListResponse,
  name: SuggestedSkillEnum.SUGGESTED_SKILL_NAME,
  pluralName: SuggestedSkillEnum.SUGGESTED_SKILL_PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice, SuggestedSkillMessagePattern);
  }

  @Query(() => [SuggestedSkillSearchAutocomplete], { name: 'suggestedSkillSearchAutocomplete' })
  async searchAutocomplete(@Args('query', {
    type: () => SuggestedSkillSearchAutocompleteQueryInput,
    nullable: true,
    defaultValue: {},
  })
  query: SuggestedSkillSearchAutocompleteQueryInput,) {
    try {
      console.log(query)
      return await firstValueFrom(
        this.commonMicroservice.send(SuggestedSkillMessagePattern.SEARCH_AUTOCOMPLETE, query),
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
