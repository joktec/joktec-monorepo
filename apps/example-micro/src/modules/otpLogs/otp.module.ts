import { Module } from '@joktec/core';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';

@Module({
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
