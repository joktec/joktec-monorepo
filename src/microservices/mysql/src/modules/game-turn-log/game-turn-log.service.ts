import { BaseService } from './../../service/base.service';
import { Injectable } from '@nestjs/common';
import { GameTurnLog } from './entities/game-turn-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sum } from 'lodash'

@Injectable()
export class GameTurnLogService extends BaseService<GameTurnLog> {
  constructor(
    @InjectRepository(GameTurnLog)
    private gameTurnLogRepository: Repository<GameTurnLog>,
  ) {
    super(gameTurnLogRepository);
  }

  async calculateRemainingTurn(jobseekerId) {
    const gameTurnLogs = await this.findBy({
      jobseekerId,
      isClaimed: true
    })
    const turns = gameTurnLogs.map(it => it.turn)
    const result = sum(turns);
    return result > 0 ? result : 0;
  }
}
