import { Model } from 'mongoose';
import {
  GameUserSession,
  GameUserSessionDocument,
} from './schemas/game-user-session.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class GameUserSessionService extends BaseService<GameUserSessionDocument> {
  constructor(
    @InjectModel(GameUserSession.name)
    private gameUserSessionModel: Model<GameUserSessionDocument>,
  ) {
    super(gameUserSessionModel);
  }
}
