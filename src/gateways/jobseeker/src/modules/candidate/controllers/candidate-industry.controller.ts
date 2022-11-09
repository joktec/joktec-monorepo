import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateIndustryInput,
  CandidateIndustryDto,
  CandidateIndustryListReponseDto,
  CandidateIndustryMessagePattern,
  CandidateIndustryQueryInput,
  UpdateCandidateIndustryInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-industry')
export class CandidateIndustryController extends BaseController<
  CandidateIndustryDto,
  CreateCandidateIndustryInput,
  UpdateCandidateIndustryInput,
  CandidateIndustryQueryInput,
  CandidateIndustryListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateIndustryMessagePattern);
  }
}
