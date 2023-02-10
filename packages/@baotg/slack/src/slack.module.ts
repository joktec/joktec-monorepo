import { CoreModule, Module, Global } from '@baotg/core';
import { SlackService } from './slack.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [SlackService],
  exports: [SlackService],
})
export class SlackModule {}
