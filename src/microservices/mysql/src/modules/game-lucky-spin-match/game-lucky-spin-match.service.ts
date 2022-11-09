import { BaseService } from '../../service/base.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GameLuckySpinMatch } from './entities/game-lucky-spin-match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameLuckySpinService } from '../game-lucky-spin/game-lucky-spin.service';
import { GameTurnLogActions, TURN_ACTION_AWARD_LUCKY_SPIN_TURN } from './../../contstants/index';
import { GameTurnLogService } from '../game-turn-log/game-turn-log.service';
import { QuizzService } from '../quizz/quizz.service';


@Injectable()
export class GameLuckySpinMatchService extends BaseService<GameLuckySpinMatch> {
  constructor(
    @InjectRepository(GameLuckySpinMatch)
    private GameLuckySpinMatchRepository: Repository<GameLuckySpinMatch>,
    @Inject(forwardRef(() => GameLuckySpinService))
    private gameLuckySpinService: GameLuckySpinService,
    @Inject(forwardRef(() => GameTurnLogService))
    private gameTurnLogService: GameTurnLogService,
    @Inject(forwardRef(() => QuizzService))
    private quizzService: QuizzService,
  ) {
    super(GameLuckySpinMatchRepository);
  }

  async getOrCreateWithInitTurn({ jobseekerId, luckySpinId }) {
    let luckySpinMatch = await this.findOne({ jobseekerId, luckySpinId });
    if (luckySpinMatch) return luckySpinMatch;
    // create lucky spin match
    luckySpinMatch = await this.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      jobseekerId,
      luckySpinId
    });
    const luckySpin = await this.gameLuckySpinService.findOne({ id: luckySpinId });
    if (luckySpin.addAdditionalTurn === 0) return luckySpinMatch;
    const turn = TURN_ACTION_AWARD_LUCKY_SPIN_TURN
    // create game turn log
    this.gameTurnLogService.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      jobseekerId,
      turn: turn,
      isRead: 1,
      isVisible: 0,
      isClaimed: 1,
      action: GameTurnLogActions.TURN_ACTION_AWARD_LUCKY_SPIN_TURN
    })
    // update remaining turn
    this.quizzService.handleUpdateRemainingTurn({ jobseekerId });
    return luckySpinMatch;
  }
}
