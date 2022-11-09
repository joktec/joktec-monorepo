import { Controller } from '@nestjs/common';
import { GameLuckySpinMatchService } from './game-lucky-spin-match.service';
import {
  BaseMicroserviceController,
  GameLuckySpinMatchMessagePattern,
} from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller('game-lucky-spin-match')
export class GameLuckySpinMatchController extends BaseMicroserviceController(
  GameLuckySpinMatchMessagePattern,
) {
  constructor(
    private readonly gameLuckySpinMatchService: GameLuckySpinMatchService,
  ) {
    super(gameLuckySpinMatchService);
  }

  @MessagePattern(GameLuckySpinMatchMessagePattern.GET_BY_JOBSEEKER)
  async getLuckySpinMatchOfLuckySpinByJobseeker(params: { luckySpinId: string, jobseekerId: string }) {
    try {
      const { luckySpinId, jobseekerId } = params;
      const items = await this.gameLuckySpinMatchService.getLuckySpinMatchOfLuckySpinByJobseeker({ luckySpinId, jobseekerId });

      return items;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}
