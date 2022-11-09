import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService, ListQuery } from '@jobhopin/core';
import { SuggestedSkill, SuggestedSkillDocument } from './schemas/suggested-skill.schema';

export class SuggestedSkillService extends BaseService<SuggestedSkillDocument> {
  constructor(
    @InjectModel(SuggestedSkill.name) private suggestedSkillModel: Model<SuggestedSkillDocument>,
  ) {
    super(suggestedSkillModel);
  }

  async searchAutocomplete(keyword: string) {
    const items = await this.findAll({ query: { title: new RegExp(`^${keyword}`, 'i') } as any, limit: 20, sort: 'createdAt' } as ListQuery)
    return items.map(it => ({
      keyword: it.title
    }))
  }
}
