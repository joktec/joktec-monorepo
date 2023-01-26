import { CounterProviders, Global, Module } from '@baotg/core';
import { MailerService } from './mailer.service';
import { MailerMetricService, TRACK_STATUS_MAILER_METRIC } from './mailer.metric';

@Global()
@Module({
  imports: [],
  providers: [
    MailerService,
    MailerMetricService,
    ...CounterProviders([{ name: TRACK_STATUS_MAILER_METRIC, label: ['type', 'status', 'conId'] }]),
  ],
  exports: [MailerService],
})
export class MailerModule {}
