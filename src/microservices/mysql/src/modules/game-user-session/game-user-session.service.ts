import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../../service';
import { GameUserSession } from './entities/game-user-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameUserSessionService extends BaseService<GameUserSession> {
  constructor(
    @InjectRepository(GameUserSession)
    private gameUserSessionRepository: Repository<GameUserSession>,
  ) {
    super(gameUserSessionRepository);
  }
}
