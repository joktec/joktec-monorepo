import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateCompanyTypeInput,
  CandidateCompanyTypeDto,
  CandidateCompanyTypeListReponseDto,
  CandidateCompanyTypeMessagePattern,
  CandidateCompanyTypeQueryInput,
  UpdateCandidateCompanyTypeInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-company-type')
export class CandidateCompanyTypeController extends BaseController<
  CandidateCompanyTypeDto,
  CreateCandidateCompanyTypeInput,
  UpdateCandidateCompanyTypeInput,
  CandidateCompanyTypeQueryInput,
  CandidateCompanyTypeListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateCompanyTypeMessagePattern);
  }
}
