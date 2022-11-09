import { firstValueFrom } from 'rxjs';
import {
  CvLinkMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvLinkInput,
  UpdateCvLinkInput,
  CvLinkQueryInput,
  CvLinkListReponse,
  CvLink,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvLink)
export class CvLinkResolver extends BaseResolver<
  CreateCvLinkInput,
  UpdateCvLinkInput,
  CvLinkQueryInput
>({
  viewDto: CvLink,
  createInput: CreateCvLinkInput,
  updateInput: UpdateCvLinkInput,
  listQueryInput: CvLinkQueryInput,
  listViewDto: CvLinkListReponse,
  name: 'cvLink',
  pluralName: 'cvLinks',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvLinkMessagePattern);
  }
}
