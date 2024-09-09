import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { User } from '../../models/schemas';
import { UserService } from './user.service';

const props: IControllerProps<User> = {
  dto: User,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('users')
export class UserController extends BaseController<User, string>(props) {
  constructor(protected userService: UserService) {
    super(userService);
  }
}
