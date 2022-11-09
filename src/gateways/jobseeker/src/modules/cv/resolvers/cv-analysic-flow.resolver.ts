import { firstValueFrom } from 'rxjs';
import {
  CvAnalysicFlowMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvAnalysicFlowInput,
  UpdateCvAnalysicFlowInput,
  CvAnalysicFlowQueryInput,
  CvAnalysicFlowListReponse,
  CvAnalysicFlow,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvAnalysicFlow)
export class CvAnalysicFlowResolver extends BaseResolver<
  CreateCvAnalysicFlowInput,
  UpdateCvAnalysicFlowInput,
  CvAnalysicFlowQueryInput
>({
  viewDto: CvAnalysicFlow,
  createInput: CreateCvAnalysicFlowInput,
  updateInput: UpdateCvAnalysicFlowInput,
  listQueryInput: CvAnalysicFlowQueryInput,
  listViewDto: CvAnalysicFlowListReponse,
  name: 'cvAnalysicFlow',
  pluralName: 'cvAnalysicFlows',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvAnalysicFlowMessagePattern);
  }
}
