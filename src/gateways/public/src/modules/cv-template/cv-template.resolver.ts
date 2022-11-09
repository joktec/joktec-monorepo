// import { CVTemplateEnum } from '@app/constants';
import { CVTemplateEnum } from '@app/constants';
import {
  CommonMicroserviceConfig,
  CvMicroserviceConfig,
  CvTemplateMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateCvTemplateInput,
  CvTemplate,
  CvTemplateListReponse,
  CvTemplateQueryInput,
  UpdateCvTemplateInput,
} from '@jobhopin/graphql';

import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

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
  name: CVTemplateEnum.CV_TEMPLATE_NAME,
  pluralName: CVTemplateEnum.CV_TEMPLATE_PLURAL_NAME,
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvTemplateMessagePattern);
  }

  @ResolveField()
  localizedName(@Parent() parent: CvTemplate) {
    return {
      vi: parent.name,
      en: parent.nameEng,
    };
  }
}
