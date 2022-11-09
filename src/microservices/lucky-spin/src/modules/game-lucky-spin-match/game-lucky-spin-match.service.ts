import { Model } from 'mongoose';
import {
  GameLuckySpinMatch,
  GameLuckySpinMatchDocument,
} from './schemas/game-lucky-spin-match.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService, ListQuery } from '@jobhopin/core';

@Injectable()
export class GameLuckySpinMatchService extends BaseService<GameLuckySpinMatchDocument> {
  constructor(
    @InjectModel(GameLuckySpinMatch.name)
    private gameLuckySpinMatchModel: Model<GameLuckySpinMatchDocument>,
  ) {
    super(gameLuckySpinMatchModel);
  }

  async getLuckySpinMatchOfLuckySpinByJobseeker({ luckySpinId, jobseekerId }) {
    const items = await this.findOne({ luckySpin: luckySpinId, jobseekerId })
    return items;
  }
}