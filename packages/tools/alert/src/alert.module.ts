import { Global, Module } from '@joktec/core';
import { AlertService } from './alert.service';

@Global()
@Module({
  imports: [],
  providers: [AlertService],
  exports: [AlertService],
})
export class AlertModule {}
