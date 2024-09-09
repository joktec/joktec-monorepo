import { Module, TransportProxyFactory } from '@joktec/core';
import { TRANSPORT } from '../../app.constant';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, TransportProxyFactory(TRANSPORT.PROXY.USER, TRANSPORT.NAME.REDIS)],
  exports: [SessionService],
})
export class SessionModule {}
