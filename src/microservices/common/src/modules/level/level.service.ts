import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { Level, LevelDocument } from './schemas/level.schema';
export class LevelService extends BaseService<LevelDocument> {
  constructor(
    @InjectModel(Level.name) private levelModel: Model<LevelDocument>,
  ) {
    super(levelModel);
  }
}
