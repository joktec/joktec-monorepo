import {
  BaseMicroserviceController,
  QuizzMatchLogMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { QuizzMatchLogService } from './quizz-match-log.service';

@Controller('quizz-match-log')
export class QuizzMatchLogController extends BaseMicroserviceController(
  QuizzMatchLogMessagePattern,
) {
  constructor(private readonly quizzMatchLogService: QuizzMatchLogService) {
    super(quizzMatchLogService);
  }

  @MessagePattern('QuizzMatchLogMessagePattern_MATCH_LOG_ME')
  answer(params: any): Promise<any> {
    try {
      return this.quizzMatchLogService.matchLogMe(params);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
