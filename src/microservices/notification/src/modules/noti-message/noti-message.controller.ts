import { Controller } from '@nestjs/common';
import { NotiMessageService } from './noti-message.service';
import {
  BaseMicroserviceController,
  NotiMessageMessagePattern,
} from '@jobhopin/core';

@Controller('noti-message')
export class NotiMessageController extends BaseMicroserviceController(
  NotiMessageMessagePattern,
) {
  constructor(private readonly notiMessageService: NotiMessageService) {
    super(notiMessageService);
  }
}
