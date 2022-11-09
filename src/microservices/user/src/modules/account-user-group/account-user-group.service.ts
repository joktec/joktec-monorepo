import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  AccountUserGroup,
  AccountUserGroupDocument,
} from './schemas/account-user-group.schema';

export class AccountUserGroupService extends BaseService<AccountUserGroupDocument> {
  constructor(
    @InjectModel(AccountUserGroup.name)
    private accountUserGroupModel: Model<AccountUserGroupDocument>,
  ) {
    super(accountUserGroupModel);
  }
}
