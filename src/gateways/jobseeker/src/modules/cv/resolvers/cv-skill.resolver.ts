import { firstValueFrom } from 'rxjs';
import {
  CvSkillMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvSkillInput,
  UpdateCvSkillInput,
  CvSkillQueryInput,
  CvSkillListReponse,
  CvSkill,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvSkill)
export class CvSkillResolver extends BaseResolver<
  CreateCvSkillInput,
  UpdateCvSkillInput,
  CvSkillQueryInput
>({
  viewDto: CvSkill,
  createInput: CreateCvSkillInput,
  updateInput: UpdateCvSkillInput,
  listQueryInput: CvSkillQueryInput,
  listViewDto: CvSkillListReponse,
  name: 'cvSkill',
  pluralName: 'cvSkills',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvSkillMessagePattern);
  }
}
