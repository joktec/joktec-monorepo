import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobInterviewService } from './job-interview.service';
import { JobInterviewController } from './job-interview.controller';
import {
  JobInterview,
  JobInterviewSchema,
} from './schemas/job-interview.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobInterview.name, schema: JobInterviewSchema },
    ]),
  ],
  controllers: [JobInterviewController],
  providers: [JobInterviewService],
})
export class JobInterviewModule {}
