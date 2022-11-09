import { firstValueFrom } from 'rxjs';
import {
  CvAttachMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvAttachInput,
  UpdateCvAttachInput,
  CvAttachQueryInput,
  CvAttachListReponse,
  CvAttach,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvAttach)
export class CvAttachResolver extends BaseResolver<
  CreateCvAttachInput,
  UpdateCvAttachInput,
  CvAttachQueryInput
>({
  viewDto: CvAttach,
  createInput: CreateCvAttachInput,
  updateInput: UpdateCvAttachInput,
  listQueryInput: CvAttachQueryInput,
  listViewDto: CvAttachListReponse,
  name: 'cvAttach',
  pluralName: 'cvAttachs',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvAttachMessagePattern);
  }
}
