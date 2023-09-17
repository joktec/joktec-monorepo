import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { User } from './models';
import { UserService } from './user.service';

const props: IControllerProps<User> = {
  dto: User,
};

@Controller('users')
export class UserController extends BaseController<User, string>(props) {
  constructor(protected userService: UserService) {
    super(userService);
  }
}
