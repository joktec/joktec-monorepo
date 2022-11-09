import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  UserCvTemplate,
  UserCvTemplateDocument,
} from './schemas/user-cv-templates.schema';

export class UserCvTemplateService extends BaseService<UserCvTemplateDocument> {
  constructor(
    @InjectModel(UserCvTemplate.name)
    private userCvTemplateModel: Model<UserCvTemplateDocument>,
  ) {
    super(userCvTemplateModel);
  }
}
