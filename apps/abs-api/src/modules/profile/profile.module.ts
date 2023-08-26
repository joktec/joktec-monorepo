import { Module } from '@joktec/core';
import { OtpModule } from '../otpLogs';
import { SessionModule } from '../sessions';
import { UserModule } from '../users';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  imports: [OtpModule, SessionModule, UserModule],
  providers: [ProfileService],
})
export class ProfileModule {}
