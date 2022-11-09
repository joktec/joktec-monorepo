import { firstValueFrom } from 'rxjs';
import {
  CvTagMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvTagInput,
  UpdateCvTagInput,
  CvTagQueryInput,
  CvTagListReponse,
  CvTag,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvTag)
export class CvTagResolver extends BaseResolver<
  CreateCvTagInput,
  UpdateCvTagInput,
  CvTagQueryInput
>({
  viewDto: CvTag,
  createInput: CreateCvTagInput,
  updateInput: UpdateCvTagInput,
  listQueryInput: CvTagQueryInput,
  listViewDto: CvTagListReponse,
  name: 'cvTag',
  pluralName: 'cvTags',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvTagMessagePattern);
  }
}
