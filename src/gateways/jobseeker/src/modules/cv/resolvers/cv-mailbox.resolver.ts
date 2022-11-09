import { firstValueFrom } from 'rxjs';
import {
  CvMailBoxMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvMailBoxInput,
  UpdateCvMailBoxInput,
  CvMailBoxQueryInput,
  CvMailBoxListReponse,
  CvMailBox,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvMailBox)
export class CvMailBoxResolver extends BaseResolver<
  CreateCvMailBoxInput,
  UpdateCvMailBoxInput,
  CvMailBoxQueryInput
>({
  viewDto: CvMailBox,
  createInput: CreateCvMailBoxInput,
  updateInput: UpdateCvMailBoxInput,
  listQueryInput: CvMailBoxQueryInput,
  listViewDto: CvMailBoxListReponse,
  name: 'cvMailBox',
  pluralName: 'cvMailBoxs',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvMailBoxMessagePattern);
  }
}
