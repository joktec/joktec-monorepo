import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { UserCv, UserCvDocument } from './schemas/user-cvs.schema';

export class UserCvService extends BaseService<UserCvDocument> {
  constructor(
    @InjectModel(UserCv.name) private userCvModel: Model<UserCvDocument>,
  ) {
    super(userCvModel);
  }
}
