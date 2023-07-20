import { CounterProviders, Global, Module } from '@joktec/core';
import { MailerMetricService, TRACK_STATUS_MAILER_METRIC } from './mailer.metric';
import { MailerService } from './mailer.service';

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
