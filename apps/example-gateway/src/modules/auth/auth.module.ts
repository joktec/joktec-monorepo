import { Module, TransportProxyFactory } from '@joktec/core';
import { TRANSPORT } from '../../app.constant';
import { OtpModule } from '../otpLogs';
import { SessionModule } from '../sessions';
import { UserModule } from '../users';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, SessionModule, OtpModule],
  controllers: [AuthController],
  providers: [AuthProvider, AuthService, TransportProxyFactory(TRANSPORT.PROXY.OTP, TRANSPORT.NAME.REDIS)],
  exports: [AuthProvider, AuthService],
})
export class AuthModule {}
