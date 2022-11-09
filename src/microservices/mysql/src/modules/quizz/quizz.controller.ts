import { QuizzMessagePattern } from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { QuizzService } from './quizz.service';

@Controller()
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @MessagePattern(QuizzMessagePattern.PLAY)
  play(params: any): Promise<any> {
    try {
      return this.quizzService.play(params);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }

  @MessagePattern(QuizzMessagePattern.CHECKIN)
  checkIn(params: any): Promise<any> {
    try {
      return this.quizzService.checkIn(params);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
