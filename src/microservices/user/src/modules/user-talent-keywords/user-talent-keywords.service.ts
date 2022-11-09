import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  UserTalentKeyword,
  UserTalentKeywordDocument,
} from './schemas/user-talent-keywords.schema';

export class UserTalentKeywordService extends BaseService<UserTalentKeywordDocument> {
  constructor(
    @InjectModel(UserTalentKeyword.name)
    private userTalentKeywordModel: Model<UserTalentKeywordDocument>,
  ) {
    super(userTalentKeywordModel);
  }
}
