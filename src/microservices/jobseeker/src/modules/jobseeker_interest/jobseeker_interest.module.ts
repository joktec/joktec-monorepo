import { Module } from '@nestjs/common';
import { JobseekerInterestService } from './jobseeker_interest.service';
import { JobseekerInterestController } from './jobseeker_interest.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerInterest,
  JobseekerInterestSchema,
} from './schemas/jobseeker_interest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerInterest.name, schema: JobseekerInterestSchema },
    ]),
  ],
  controllers: [JobseekerInterestController],
  providers: [JobseekerInterestService]
})
export class JobseekerInterestModule {}
