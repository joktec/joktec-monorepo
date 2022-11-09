import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  SkillMessagePattern,
  CommonMicroserviceConfig,
} from '@baotg/core';
import {
  BaseResolver,
} from '@baotg/graphql';

import {
  CreateSkillInput,
  UpdateSkillInput,
  SkillQueryInput,
} from '../inputs';
import { SkillTypedef, SkillListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../skill.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => SkillTypedef)
export class SkillResolver extends BaseResolver<
  CreateSkillInput,
  UpdateSkillInput,
  SkillQueryInput
>({
  viewDto: SkillTypedef,
  createInput: CreateSkillInput,
  updateInput: UpdateSkillInput,
  listQueryInput: SkillQueryInput,
  listViewDto: SkillListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly skillMicroservice: ClientProxy,
  ) {
    super(skillMicroservice, SkillMessagePattern);
  }
}
