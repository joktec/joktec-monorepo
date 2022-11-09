import { firstValueFrom } from 'rxjs';
import {
  CvMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvInput,
  UpdateCvInput,
  CvQueryInput,
  CvListReponse,
  Cv,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => Cv)
export class CvResolver extends BaseResolver<
  CreateCvInput,
  UpdateCvInput,
  CvQueryInput
>({
  viewDto: Cv,
  createInput: CreateCvInput,
  updateInput: UpdateCvInput,
  listQueryInput: CvQueryInput,
  listViewDto: CvListReponse,
  name: 'cv',
  pluralName: 'cvs',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvMessagePattern);
  }
}
