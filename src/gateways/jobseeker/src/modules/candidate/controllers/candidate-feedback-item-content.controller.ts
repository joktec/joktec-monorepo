import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateFeedbackItemContentInput,
  CandidateFeedbackItemContentDto,
  CandidateFeedbackItemContentListReponseDto,
  CandidateFeedbackItemContentMessagePattern,
  CandidateFeedbackItemContentQueryInput,
  UpdateCandidateFeedbackItemContentInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-feedback-item-content')
export class CandidateFeedbackItemContentController extends BaseController<
  CandidateFeedbackItemContentDto,
  CreateCandidateFeedbackItemContentInput,
  UpdateCandidateFeedbackItemContentInput,
  CandidateFeedbackItemContentQueryInput,
  CandidateFeedbackItemContentListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackItemContentMessagePattern);
  }
}
