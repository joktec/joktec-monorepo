import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseService,
  ICustomConditionQuery,
  ListQuery,
} from '@jobhopin/core';
import {
  AccountGroup,
  AccountGroupDocument,
} from './schemas/account-group.schema';
import { AccountUserGroupService } from '../account-user-group/account-user-group.service';

export class AccountGroupService extends BaseService<AccountGroupDocument> {
  constructor(
    @InjectModel(AccountGroup.name)
    accountGroupModel: Model<AccountGroupDocument>,

    private readonly accountUserGroupService: AccountUserGroupService,
  ) {
    super(accountGroupModel);
  }

  async query(
    condition: BaseConditionInput,
    pagination: BasePaginationInput,
    customCondition?: ICustomConditionQuery,
  ): Promise<any> {
    return await super.query(condition, pagination, customCondition);
  }

  async getCodenameByUserId(userId: string) {
    try {
      const condition = { usersId: userId };
      const accountGroup = await this.accountUserGroupService.findAllCustom(
        condition,
      );

      const accountGroupId = [
        ...new Set(accountGroup.map((item) => item.accountgroup)),
      ];

      const managerGroup = await super.findAllCustom({
        _id: {
          $in: accountGroupId,
        },
      });

      return managerGroup.map((item) => item.codename);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
