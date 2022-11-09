import { firstValueFrom } from 'rxjs';
import {
  CvFeedbackMessagePattern,
  CvMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCvFeedbackInput,
  UpdateCvFeedbackInput,
  CvFeedbackQueryInput,
  CvFeedbackListReponse,
  CvFeedback,
} from '@jobhopin/graphql';

const cvMicroserviceConfig = new CvMicroserviceConfig();
@Resolver(() => CvFeedback)
export class CvFeedbackResolver extends BaseResolver<
  CreateCvFeedbackInput,
  UpdateCvFeedbackInput,
  CvFeedbackQueryInput
>({
  viewDto: CvFeedback,
  createInput: CreateCvFeedbackInput,
  updateInput: UpdateCvFeedbackInput,
  listQueryInput: CvFeedbackQueryInput,
  listViewDto: CvFeedbackListReponse,
  name: 'cvFeedback',
  pluralName: 'cvFeedbacks',
}) {
  constructor(
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {
    super(cvMicroservice, CvFeedbackMessagePattern);
  }
}
