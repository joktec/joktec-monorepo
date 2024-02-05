import { Global, Module } from '@joktec/core';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Global()
@Module({
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
