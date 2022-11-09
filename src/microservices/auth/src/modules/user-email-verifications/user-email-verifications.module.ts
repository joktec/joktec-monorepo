import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEmailVerificationService } from './user-email-verifications.service';
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
  controllers: [],
  exports: [UserEmailVerificationService],
})
export class UserEmailVerificationModule {}
