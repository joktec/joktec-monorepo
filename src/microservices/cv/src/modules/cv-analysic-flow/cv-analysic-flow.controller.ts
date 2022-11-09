import {
  BaseMicroserviceController,
  CvAnalysicFlowMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvAnalysicFlowService } from './cv-analysic-flow.service';

@Controller('cv-analyticflow')
export class CvAnalysicFlowController extends BaseMicroserviceController(
  CvAnalysicFlowMessagePattern,
) {
  constructor(private readonly cvService: CvAnalysicFlowService) {
    super(cvService);
  }
}
