import { Module, TransportProxyFactory } from '@joktec/core';
import { TRANSPORT } from '../../app.constant';
import { OtpModule } from '../otpLogs';
import { SessionModule } from '../sessions';
import { UserModule } from '../users';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [UserModule, OtpModule, SessionModule],
  controllers: [ProfileController],
  providers: [ProfileService, TransportProxyFactory(TRANSPORT.PROXY.USER, TRANSPORT.NAME.REDIS)],
  exports: [ProfileService],
})
export class ProfileModule {}
