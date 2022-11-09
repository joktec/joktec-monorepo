import { Controller } from '@nestjs/common';
import { BaseMicroserviceController } from '@jobhopin/core';
import { UserMessagePattern } from '@jobhopin/core';

import { UserService } from './users.service';
import { PLURAL_NAME } from './users.constants';

@Controller(PLURAL_NAME)
export class UserController extends BaseMicroserviceController(UserMessagePattern) {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}