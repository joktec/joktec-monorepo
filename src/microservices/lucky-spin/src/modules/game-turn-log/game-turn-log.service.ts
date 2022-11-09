import { Model } from 'mongoose';
import {
  GameTurnLog,
  GameTurnLogDocument,
} from './schemas/game-turn-log.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class GameTurnLogService extends BaseService<GameTurnLogDocument> {
  constructor(
    @InjectModel(GameTurnLog.name)
    private gameTurnLogModel: Model<GameTurnLogDocument>,
  ) {
    super(gameTurnLogModel);
  }

  async createTurnCheckIn(data) {
    try {
      return await this.gameTurnLogModel.create(data);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
