import { CoreModule, Module, Global } from '@joktec/core';
import { AlertService } from './alert.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [AlertService],
  exports: [AlertService],
})
export class AlertModule {}
