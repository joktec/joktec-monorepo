import { Model } from 'mongoose';
import {
  GameLuckySpin,
  GameLuckySpinDocument,
} from './schemas/game-lucky-spin.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class GameLuckySpinService extends BaseService<GameLuckySpinDocument> {
  constructor(
    @InjectModel(GameLuckySpin.name)
    private gameLuckySpinModel: Model<GameLuckySpinDocument>,
  ) {
    super(gameLuckySpinModel);
  }
}
