import { QuizzQuestionMessagePattern } from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { QuizzQuestionService } from './quizz-question.service';

@Controller()
export class QuizzQuestionController {
  constructor(private readonly quizzQuestionService: QuizzQuestionService) {}

  @MessagePattern(QuizzQuestionMessagePattern.ANSWER)
  answer(params: any): Promise<any> {
    try {
      return this.quizzQuestionService.answer(params);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
