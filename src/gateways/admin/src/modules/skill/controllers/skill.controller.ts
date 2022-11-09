import {
  BaseController,
  CreateSkillInput,
  SkillDto,
  SkillListResponseDto,
  SkillMessagePattern,
  CommonMicroserviceConfig,
  SkillQueryInput,
  UpdateSkillInput,
} from '@baotg/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../skill.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class SkillController extends BaseController<
  SkillDto,
  CreateSkillInput,
  UpdateSkillInput,
  SkillQueryInput,
  SkillListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, SkillMessagePattern);
  }
}
