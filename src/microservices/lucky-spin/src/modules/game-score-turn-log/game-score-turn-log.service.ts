import { Model } from 'mongoose';
import {
  GameScoreTurnLog,
  GameScoreTurnLogDocument,
} from './schemas/game-score-turn-log.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class GameScoreTurnLogService extends BaseService<GameScoreTurnLogDocument> {
  constructor(
    @InjectModel(GameScoreTurnLog.name)
    private gameScoreTurnLogModel: Model<GameScoreTurnLogDocument>,
  ) {
    super(gameScoreTurnLogModel);
  }
}
