import { BaseService } from '../../service/base.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GameLuckySpinHistory } from './entities/game-lucky-spin-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class GameLuckySpinHistoryService extends BaseService<GameLuckySpinHistory> {
  constructor(
    @InjectRepository(GameLuckySpinHistory)
    private GameLuckySpinHistoryRepository: Repository<GameLuckySpinHistory>,
  ) {
    super(GameLuckySpinHistoryRepository);
  }
}
