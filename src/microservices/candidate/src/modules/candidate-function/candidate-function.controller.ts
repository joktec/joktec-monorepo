import {
  BaseMicroserviceController,
  CandidateFunctionMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateFunctionService } from './candidate-function.service';
@Controller('candidate-function')
export class CandidateFunctionController extends BaseMicroserviceController(
  CandidateFunctionMessagePattern,
) {
  constructor(
    private readonly candidateFunctionService: CandidateFunctionService,
  ) {
    super(candidateFunctionService);
  }
}
