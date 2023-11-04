import { Global, Module } from '@joktec/core';
import { SessionController } from './session.controller';
import { SessionRepo } from './session.repo';
import { SessionService } from './session.service';

@Global()
@Module({
  controllers: [SessionController],
  providers: [SessionRepo, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
