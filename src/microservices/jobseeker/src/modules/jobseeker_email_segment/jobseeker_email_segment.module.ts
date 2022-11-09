import { Module } from '@nestjs/common';
import { JobseekerEmailSegmentService } from './jobseeker_email_segment.service';
import { JobseekerEmailSegmentController } from './jobseeker_email_segment.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerEmailSegment,
  JobseekerEmailSegmentSchema,
} from './schemas/jobseeker_email_segment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerEmailSegment.name, schema: JobseekerEmailSegmentSchema },
    ]),
  ],
  controllers: [JobseekerEmailSegmentController],
  providers: [JobseekerEmailSegmentService]
})
export class JobseekerEmailSegmentModule {}
