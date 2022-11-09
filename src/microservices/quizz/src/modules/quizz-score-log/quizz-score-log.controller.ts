import { MessagePattern, RpcException } from '@nestjs/microservices';
import {
  BaseMicroserviceController,
  QuizzScoreLogMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzScoreLogService } from './quizz-score-log.service';

@Controller('quizz-score-log')
export class QuizzScoreLogController extends BaseMicroserviceController(
  QuizzScoreLogMessagePattern,
) {
  constructor(private readonly quizzScoreLogService: QuizzScoreLogService) {
    super(quizzScoreLogService);
  }

  @MessagePattern(QuizzScoreLogMessagePattern.RANKING)
  ranking(params: any): Promise<any> {
    try {
      return this.quizzScoreLogService.getListRanking(params);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
