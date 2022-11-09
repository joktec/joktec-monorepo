import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { SkillDocument } from './schemas/skill.schema';
import { NAME } from './skill.constants';

export class SkillService extends BaseService<SkillDocument> {
  constructor(
    @InjectModel(NAME) private skillModel: Model<SkillDocument>,
  ) {
    super(skillModel);
  }
}
