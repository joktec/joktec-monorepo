import { Module } from '@nestjs/common';
import { JobseekerJobReferralService } from './jobseeker_job_referral.service';
import { JobseekerJobReferralController } from './jobseeker_job_referral.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerJobReferral,
  JobseekerJobReferralSchema,
} from './schemas/jobseeker_job_referral.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerJobReferral.name, schema: JobseekerJobReferralSchema },
    ]),
  ],
  controllers: [JobseekerJobReferralController],
  providers: [JobseekerJobReferralService]
})
export class JobseekerJobReferralModule {}
