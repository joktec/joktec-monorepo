import { Module } from '@joktec/core';
import { OtpModule } from '../otpLogs';
import { SessionModule } from '../sessions';
import { UserModule } from '../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [OtpModule, SessionModule, UserModule],
  providers: [AuthService],
})
export class AuthModule {}
