import {
  BaseMicroserviceController,
  QuizzMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { QuizzService } from './quizz.service';

@Controller('quizz')
export class QuizzController extends BaseMicroserviceController(
  QuizzMessagePattern,
) {
  constructor(private readonly quizzService: QuizzService) {
    super(quizzService);
  }

  @MessagePattern(QuizzMessagePattern.MY_OVERALL)
  myOverall(params: any): Promise<any> {
    try {
      return this.quizzService.myOverall(params);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
