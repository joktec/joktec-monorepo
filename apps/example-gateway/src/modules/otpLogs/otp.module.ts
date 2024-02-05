import { Module } from '@joktec/core';
import { OtpService } from './otp.service';

@Module({
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
