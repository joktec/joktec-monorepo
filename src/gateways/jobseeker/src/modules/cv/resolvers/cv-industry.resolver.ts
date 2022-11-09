import { firstValueFrom } from 'rxjs';
import {
  CvIndustryMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvIndustryInput,
  UpdateCvIndustryInput,
  CvIndustryQueryInput,
  CvIndustryListReponse,
  CvIndustry,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvIndustry)
export class CvIndustryResolver extends BaseResolver<
  CreateCvIndustryInput,
  UpdateCvIndustryInput,
  CvIndustryQueryInput
>({
  viewDto: CvIndustry,
  createInput: CreateCvIndustryInput,
  updateInput: UpdateCvIndustryInput,
  listQueryInput: CvIndustryQueryInput,
  listViewDto: CvIndustryListReponse,
  name: 'cvIndustry',
  pluralName: 'cvIndustries',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvIndustryMessagePattern);
  }
}
