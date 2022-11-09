import { GameLuckySpinMessagePattern } from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { GameLuckySpinService } from './game-lucky-spin.service';

@Controller()
export class GameLuckySpinController {
  constructor(private readonly gameLuckySpinService: GameLuckySpinService) { }

  @MessagePattern(GameLuckySpinMessagePattern.PLAY)
  play(params: any): Promise<any> {
    try {
      console.log(params)
      return this.gameLuckySpinService.play(params);
    } catch (error) {
      console.log(error)
      throw new RpcException(error as any);
    }
  }
}
