import { firstValueFrom } from 'rxjs';
import {
  CvHistoryMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvHistoryInput,
  UpdateCvHistoryInput,
  CvHistoryQueryInput,
  CvHistoryListReponse,
  CvHistory,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvHistory)
export class CvHistoryResolver extends BaseResolver<
  CreateCvHistoryInput,
  UpdateCvHistoryInput,
  CvHistoryQueryInput
>({
  viewDto: CvHistory,
  createInput: CreateCvHistoryInput,
  updateInput: UpdateCvHistoryInput,
  listQueryInput: CvHistoryQueryInput,
  listViewDto: CvHistoryListReponse,
  name: 'cvHistory',
  pluralName: 'cvHistories',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvHistoryMessagePattern);
  }
}
