import { Module } from '@joktec/core';
import { OtpRepo } from './otp.repo';
import { OtpService } from './otp.service';

@Module({
  providers: [OtpRepo, OtpService],
  exports: [OtpService],
})
export class OtpModule {}
