import { firstValueFrom } from 'rxjs';
import {
  CvTemplateMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvTemplateInput,
  UpdateCvTemplateInput,
  CvTemplateQueryInput,
  CvTemplateListReponse,
  CvTemplate,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvTemplate)
export class CvTemplateResolver extends BaseResolver<
  CreateCvTemplateInput,
  UpdateCvTemplateInput,
  CvTemplateQueryInput
>({
  viewDto: CvTemplate,
  createInput: CreateCvTemplateInput,
  updateInput: UpdateCvTemplateInput,
  listQueryInput: CvTemplateQueryInput,
  listViewDto: CvTemplateListReponse,
  name: 'cvTemplate',
  pluralName: 'cvTemplates',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvTemplateMessagePattern);
  }
}
