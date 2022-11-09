import { BaseService } from '../../service/base.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GameLuckySpinItem } from './entities/game-lucky-spin-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GameLuckySpinItemService extends BaseService<GameLuckySpinItem> {
  constructor(
    @InjectRepository(GameLuckySpinItem)
    private GameLuckySpinItemRepository: Repository<GameLuckySpinItem>,
  ) {
    super(GameLuckySpinItemRepository);
  }
}
