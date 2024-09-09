import { ClientController, Controller, EventPattern, IMicroControllerProps, Payload, Transport } from '@joktec/core';
import { Notification } from '../../models/schemas';
import { NotificationService } from './notification.service';

const props: IMicroControllerProps<Notification> = {
  dto: Notification,
  transport: Transport.REDIS,
};

@Controller('notifications')
export class NotificationController extends ClientController<Notification, string>(props) {
  constructor(protected notificationService: NotificationService) {
    super(notificationService);
  }

  @EventPattern({ cmd: `Notification.send` }, Transport.REDIS)
  async send(@Payload('notification') notification: Notification): Promise<any> {
    return this.notificationService.push(notification._id);
  }
}
