import { QuizzVoteLogMessagePattern } from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { QuizzVoteLogService } from './quizz-vote-log.service';

@Controller()
export class QuizzVoteLogController {
  constructor(private readonly quizzVoteLogService: QuizzVoteLogService) {}

  @MessagePattern(QuizzVoteLogMessagePattern.VOTE)
  vote(params: any): Promise<any> {
    try {
      return this.quizzVoteLogService.vote(params);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }

  @MessagePattern(QuizzVoteLogMessagePattern.MY_VOTE)
  getQuizzVoteByJobSeeker(params: any): Promise<any> {
    try {
      return this.quizzVoteLogService.getQuizzVoteByJobSeeker(params);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
