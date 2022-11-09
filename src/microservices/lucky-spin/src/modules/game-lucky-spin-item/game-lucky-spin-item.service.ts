import { Model } from 'mongoose';
import {
  GameLuckySpinItem,
  GameLuckySpinItemDocument,
} from './schemas/game-lucky-spin-item.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';
@Injectable()
export class GameLuckySpinItemService extends BaseService<GameLuckySpinItemDocument> {
  constructor(
    @InjectModel(GameLuckySpinItem.name)
    private gameLuckySpinItemModel: Model<GameLuckySpinItemDocument>,
  ) {
    super(gameLuckySpinItemModel);
  }
}
