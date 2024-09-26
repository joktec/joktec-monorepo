import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  BaseController,
  Body,
  Controller,
  IControllerProps,
  LoggedUser,
  Post,
} from '@joktec/core';
import { AuthGuard, RoleGuard, SuccessResponse } from '../../common';
import { Notification, User } from '../../models/schemas';
import { NotificationFilterDto, NotificationReadDto } from './models';
import { NotificationService } from './notification.service';

const props: IControllerProps<Notification> = {
  dto: Notification,
  customDto: { queryDto: NotificationFilterDto },
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('notifications')
export class NotificationController extends BaseController<Notification, string>(props) {
  constructor(protected notificationService: NotificationService) {
    super(notificationService);
  }

  @Post('read')
  @ApiOperation({ summary: `Read notifications` })
  @ApiBody({ type: NotificationReadDto })
  @ApiOkResponse({ type: SuccessResponse })
  async read(@Body() dto: NotificationReadDto, @LoggedUser() loggedUser: User): Promise<SuccessResponse> {
    return this.notificationService.read(dto, loggedUser);
  }
}
