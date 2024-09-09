import { Module } from '@joktec/core';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationUtils } from './notification.utils';

@Module({
  controllers: [NotificationController],
  providers: [NotificationUtils, NotificationService],
  exports: [NotificationUtils, NotificationService],
})
export class NotificationModule {}
