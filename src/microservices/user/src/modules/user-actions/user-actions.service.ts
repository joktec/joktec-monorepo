import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { UserAction, UserActionDocument } from './schemas/user-actions.schema';

export class UserActionService extends BaseService<UserActionDocument> {
  constructor(
    @InjectModel(UserAction.name)
    private userActionModel: Model<UserActionDocument>,
  ) {
    super(userActionModel);
  }
}
