import { GameTurnLogActions } from './../../contstants/index';
import { BaseService } from './../../service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GameScoreTurnLog } from './entities/game-score-turn-log.entity';
import { Repository } from 'typeorm';
import { GameTurnLogService } from '../game-turn-log/game-turn-log.service';
@Injectable()
export class GameScoreTurnLogService extends BaseService<GameScoreTurnLog> {
  constructor(
    @InjectRepository(GameScoreTurnLog)
    private gameScoreTurnLogRepository: Repository<GameScoreTurnLog>,
    @Inject(forwardRef(() => GameTurnLogService))
    private gameTurnLogService: GameTurnLogService,
  ) {
    super(gameScoreTurnLogRepository);
  }

  async getOrCreateWithInitTurn({ jobseekerId, userId }) {
    const DEFAULT_INIT_TURN = 20
    let gameScoreTurnLog = await this.findOne({ jobseekerId, userId });
    if (gameScoreTurnLog) return gameScoreTurnLog;
    gameScoreTurnLog = await this.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      remainingTurn: DEFAULT_INIT_TURN,
      totalScore: 0,
      jobseekerId,
      userId
    })
    this.gameTurnLogService.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      jobseekerId,
      turn: DEFAULT_INIT_TURN,
      isRead: 1,
      isVisible: 0,
      isClaimed: 1,
      action: GameTurnLogActions.TURN_ACTION_AWARD_TURN,
    })
    return gameScoreTurnLog;
  }
}
