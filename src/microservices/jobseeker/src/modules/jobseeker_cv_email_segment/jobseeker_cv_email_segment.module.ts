import { Module } from '@nestjs/common';
import { JobseekerCvEmailSegmentService } from './jobseeker_cv_email_segment.service';
import { JobseekerCvEmailSegmentController } from './jobseeker_cv_email_segment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerCvEmailSegment,
  JobseekerCvEmailSegmentSchema,
} from './schemas/jobseeker_cv_email_segment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerCvEmailSegment.name, schema: JobseekerCvEmailSegmentSchema },
    ]),
  ],
  controllers: [JobseekerCvEmailSegmentController],
  providers: [JobseekerCvEmailSegmentService]
})
export class JobseekerCvEmailSegmentModule {}
