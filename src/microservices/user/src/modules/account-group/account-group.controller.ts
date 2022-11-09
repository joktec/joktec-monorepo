import { Controller } from '@nestjs/common';
import {
  BaseMicroserviceController,
  AccountGroupMessagePattern,
} from '@jobhopin/core';

import { AccountGroupService } from './account-group.service';
import { PLURAL_NAME } from './account-group.constants';
import { MessagePattern } from '@nestjs/microservices';

@Controller(PLURAL_NAME)
export class AccountGroupController extends BaseMicroserviceController(
  AccountGroupMessagePattern,
) {
  constructor(private readonly accountGroupService: AccountGroupService) {
    super(accountGroupService);
  }

  @MessagePattern(AccountGroupMessagePattern.GET_CODENAME_BY_USER_ID)
  async getCodeNameByUserId(userId: string) {
    return await this.accountGroupService.getCodenameByUserId(userId);
  }
}
