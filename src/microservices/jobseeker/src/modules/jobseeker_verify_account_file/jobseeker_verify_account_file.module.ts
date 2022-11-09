import { Module } from '@nestjs/common';
import { JobseekerVerifyAccountFileService } from './jobseeker_verify_account_file.service';
import { JobseekerVerifyAccountFileController } from './jobseeker_verify_account_file.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerVerifyAccountFile,
  JobseekerVerifyAccountFileSchema,
} from './schemas/jobseeker_verify_account_file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerVerifyAccountFile.name, schema: JobseekerVerifyAccountFileSchema },
    ]),
  ],
  controllers: [JobseekerVerifyAccountFileController],
  providers: [JobseekerVerifyAccountFileService]
})
export class JobseekerVerifyAccountFileModule {}
