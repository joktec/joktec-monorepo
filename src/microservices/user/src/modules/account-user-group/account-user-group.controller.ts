import { Controller } from '@nestjs/common';
import {
  BaseMicroserviceController,
  AccountUserGroupMessagePattern,
} from '@jobhopin/core';

import { AccountUserGroupService } from './account-user-group.service';
import { PLURAL_NAME } from './account-user-group.constants';

@Controller(PLURAL_NAME)
export class AccountUserGroupController extends BaseMicroserviceController(
  AccountUserGroupMessagePattern,
) {
  constructor(private readonly userService: AccountUserGroupService) {
    super(userService);
  }
}
