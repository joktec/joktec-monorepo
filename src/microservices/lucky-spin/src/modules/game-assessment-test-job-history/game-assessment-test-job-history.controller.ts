import { Controller } from '@nestjs/common';
import { GameAssessmentTestJobHistoryService } from './game-assessment-test-job-history.service';
import {
  BaseMicroserviceController,
  GameAssessmentTestJobHistoryMessagePattern,
} from '@jobhopin/core';

@Controller()
export class GameAssessmentTestJobHistoryController extends BaseMicroserviceController(
  GameAssessmentTestJobHistoryMessagePattern,
) {
  constructor(
    private readonly gameAssessmentTestJobHistoryService: GameAssessmentTestJobHistoryService,
  ) {
    super(gameAssessmentTestJobHistoryService);
  }
}
