import { Model } from 'mongoose';
import { CvSkill, CvSkillDocument } from './schemas/cv-skill.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvSkillService extends BaseService<CvSkillDocument> {
  constructor(
    @InjectModel(CvSkill.name)
    private cvModel: Model<CvSkillDocument>,
  ) {
    super(cvModel);
  }
}
