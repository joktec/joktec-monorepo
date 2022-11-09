import {
  BaseMicroserviceController,
  QuizzActionLogMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzActionLogService } from './quizz-action-log.service';

@Controller('quizz-action-log')
export class QuizzActionLogController extends BaseMicroserviceController(
  QuizzActionLogMessagePattern,
) {
  constructor(
    private readonly questionActionLogService: QuizzActionLogService,
  ) {
    super(questionActionLogService);
  }
}
