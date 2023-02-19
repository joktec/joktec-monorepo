import { Module, Global } from '@joktec/core';
import { NotifierService } from './notifier.service';

@Global()
@Module({
  imports: [],
  providers: [NotifierService],
  exports: [NotifierService],
})
export class NotifierModule {}
