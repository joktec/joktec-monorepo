import {
  BaseMicroserviceController,
  QuizzVoteLogMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzVoteLogService } from './quizz-vote-log.service';

@Controller('quizz-vote-log')
export class QuizzVoteLogController extends BaseMicroserviceController(
  QuizzVoteLogMessagePattern,
) {
  constructor(private readonly quizzVoteLogService: QuizzVoteLogService) {
    super(quizzVoteLogService);
  }
}
