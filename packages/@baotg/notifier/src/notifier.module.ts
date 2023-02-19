import { Module, Global } from '@baotg/core';
import { NotifierService } from './notifier.service';

@Global()
@Module({
  imports: [],
  providers: [NotifierService],
  exports: [NotifierService],
})
export class NotifierModule {}
