import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { User } from '../../models/entities';
import { UserService } from './user.service';

const props: IControllerProps<User> = {
  dto: User,
  bearer: AuthGuard,
  guards: RoleGuard,
};

@Controller('users')
export class UserController extends BaseController<User, string>(props) {
  constructor(protected userService: UserService) {
    super(userService);
  }
}
