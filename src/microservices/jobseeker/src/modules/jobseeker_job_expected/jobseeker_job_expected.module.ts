import { Module } from '@nestjs/common';
import { JobseekerJobExpectedService } from './jobseeker_job_expected.service';
import { JobseekerJobExpectedController } from './jobseeker_job_expected.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerJobExpected,
  JobseekerJobExpectedSchema,
} from './schemas/jobseeker_job_expected.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerJobExpected.name, schema: JobseekerJobExpectedSchema },
    ]),
  ],
  controllers: [JobseekerJobExpectedController],
  providers: [JobseekerJobExpectedService]
})
export class JobseekerJobExpectedModule {}
