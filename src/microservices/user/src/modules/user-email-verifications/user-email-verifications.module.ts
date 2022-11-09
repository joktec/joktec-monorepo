import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEmailVerificationService } from './user-email-verifications.service';
import { UserEmailVerificationController } from './user-email-verifications.controller';
import {
  UserEmailVerification,
  UserEmailVerificationSchema,
} from './schemas/user-email-verifications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEmailVerification.name, schema: UserEmailVerificationSchema },
    ]),
  ],
  providers: [UserEmailVerificationService],
  controllers: [UserEmailVerificationController],
  exports: [UserEmailVerificationService],
})
export class UserEmailVerificationModule {}
