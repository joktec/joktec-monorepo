import {
  BaseController,
  CandidateDto,
  CandidateMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();

@Controller('candidates')
export class CandidateController extends BaseController<
  CandidateDto,
  any,
  any,
  any,
  any
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateMessagePattern);
  }
}
