import { firstValueFrom } from 'rxjs';
import {
  CvScoreMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvScoreInput,
  UpdateCvScoreInput,
  CvScoreQueryInput,
  CvScoreListReponse,
  CvScore,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvScore)
export class CvScoreResolver extends BaseResolver<
  CreateCvScoreInput,
  UpdateCvScoreInput,
  CvScoreQueryInput
>({
  viewDto: CvScore,
  createInput: CreateCvScoreInput,
  updateInput: UpdateCvScoreInput,
  listQueryInput: CvScoreQueryInput,
  listViewDto: CvScoreListReponse,
  name: 'cvScore',
  pluralName: 'cvScores',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvScoreMessagePattern);
  }
}
