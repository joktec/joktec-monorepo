import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateFeedbackGroupContentInput,
  CandidateFeedbackGroupContentDto,
  CandidateFeedbackGroupContentListReponseDto,
  CandidateFeedbackGroupContentMessagePattern,
  CandidateFeedbackGroupContentQueryInput,
  UpdateCandidateFeedbackGroupContentInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-feedback-group-content')
export class CandidateFeedbackGroupContentController extends BaseController<
  CandidateFeedbackGroupContentDto,
  CreateCandidateFeedbackGroupContentInput,
  UpdateCandidateFeedbackGroupContentInput,
  CandidateFeedbackGroupContentQueryInput,
  CandidateFeedbackGroupContentListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackGroupContentMessagePattern);
  }
}
