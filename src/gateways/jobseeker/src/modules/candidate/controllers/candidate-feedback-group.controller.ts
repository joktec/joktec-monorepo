import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateFeedbackGroupInput,
  CandidateFeedbackGroupDto,
  CandidateFeedbackGroupListReponseDto,
  CandidateFeedbackGroupMessagePattern,
  CandidateFeedbackGroupQueryInput,
  UpdateCandidateFeedbackGroupInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-feedback-group')
export class CandidateFeedbackGroupController extends BaseController<
  CandidateFeedbackGroupDto,
  CreateCandidateFeedbackGroupInput,
  UpdateCandidateFeedbackGroupInput,
  CandidateFeedbackGroupQueryInput,
  CandidateFeedbackGroupListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackGroupMessagePattern);
  }
}
