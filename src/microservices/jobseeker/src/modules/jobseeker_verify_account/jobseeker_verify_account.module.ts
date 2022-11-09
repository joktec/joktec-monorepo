import { Module } from '@nestjs/common';
import { JobseekerVerifyAccountService } from './jobseeker_verify_account.service';
import { JobseekerVerifyAccountController } from './jobseeker_verify_account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerVerifyAccount,
  JobseekerVerifyAccountSchema,
} from './schemas/jobseeker_verify_accounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerVerifyAccount.name, schema: JobseekerVerifyAccountSchema },
    ]),
  ],
  controllers: [JobseekerVerifyAccountController],
  providers: [JobseekerVerifyAccountService]
})
export class JobseekerVerifyAccountModule {}
