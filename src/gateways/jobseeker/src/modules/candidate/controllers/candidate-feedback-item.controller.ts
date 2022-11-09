import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateFeedbackItemInput,
  CandidateFeedbackItemDto,
  CandidateFeedbackItemListReponseDto,
  CandidateFeedbackItemMessagePattern,
  CandidateFeedbackItemQueryInput,
  UpdateCandidateFeedbackItemInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-feedback-item')
export class CandidateFeedbackItemController extends BaseController<
  CandidateFeedbackItemDto,
  CreateCandidateFeedbackItemInput,
  UpdateCandidateFeedbackItemInput,
  CandidateFeedbackItemQueryInput,
  CandidateFeedbackItemListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackItemMessagePattern);
  }
}
