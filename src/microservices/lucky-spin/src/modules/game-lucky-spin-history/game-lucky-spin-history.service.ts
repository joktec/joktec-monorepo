import { Model } from 'mongoose';
import {
  GameLuckySpinHistory,
  GameLuckySpinHistoryDocument,
} from './schemas/game-lucky-spin-history.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class GameLuckySpinHistoryService extends BaseService<GameLuckySpinHistoryDocument> {
  constructor(
    @InjectModel(GameLuckySpinHistory.name)
    private gameLuckySpinHistoryModel: Model<GameLuckySpinHistoryDocument>,
  ) {
    super(gameLuckySpinHistoryModel);
  }
}
