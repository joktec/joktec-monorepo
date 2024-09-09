import { ClientController, Controller, EventPattern, IMicroControllerProps, Payload, Transport } from '@joktec/core';
import { SuccessResponse } from '../../common';
import { ArticleType } from '../../models/constants';
import { Session, User } from '../../models/schemas';
import { UserService } from './user.service';

const props: IMicroControllerProps<User> = {
  dto: User,
  transport: Transport.REDIS,
};

@Controller('users')
export class UserController extends ClientController<User, string>(props) {
  constructor(protected userService: UserService) {
    super(userService);
  }

  @EventPattern({ cmd: `User.logKeyword` }, Transport.REDIS)
  async logKeyword(
    @Payload('userId') userId: string,
    @Payload('keyword') keyword: string,
    @Payload('type') type: ArticleType,
  ): Promise<SuccessResponse> {
    return this.userService.logKeyword(userId, keyword, type);
  }

  @EventPattern({ cmd: `User.subscribeToTopic` }, Transport.REDIS)
  async subscribeToTopic(@Payload('user') user: User, @Payload('session') session: Session) {
    return this.userService.subscribeToTopic(user, session);
  }

  @EventPattern({ cmd: `User.resubscribeToTopic` }, Transport.REDIS)
  async resubscribeToTopic(
    @Payload('user') user: User,
    @Payload('session') session: Session,
    @Payload('oldFcmToken') oldFcmToken: string,
  ) {
    return this.userService.resubscribeToTopic(user, session, oldFcmToken);
  }

  @EventPattern({ cmd: `User.unsubscribeFromTopic` }, Transport.REDIS)
  async unsubscribeFromTopic(@Payload('session') session: Session) {
    return this.userService.unsubscribeFromTopic(session);
  }

  @EventPattern({ cmd: `User.refreshTopic` }, Transport.REDIS)
  async refreshTopic(@Payload('user') user: User) {
    return this.userService.refreshTopic(user);
  }
}
