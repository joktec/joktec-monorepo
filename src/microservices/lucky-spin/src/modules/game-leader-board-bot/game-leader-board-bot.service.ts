import { InjectModel } from '@nestjs/mongoose';
import {
  GameLeaderBoardBot,
  GameLeaderBoardBotDocument,
} from './schemas/game-leader-board-bot.schema';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@jobhopin/core';
import { Model } from 'mongoose';

@Injectable()
export class GameLeaderBoardBotService extends BaseService<GameLeaderBoardBotDocument> {
  constructor(
    @InjectModel(GameLeaderBoardBot.name)
    private gameLeaderBoardBotModel: Model<GameLeaderBoardBotDocument>,
  ) {
    super(gameLeaderBoardBotModel);
  }
}
