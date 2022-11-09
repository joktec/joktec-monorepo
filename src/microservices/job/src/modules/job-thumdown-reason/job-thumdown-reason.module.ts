import {
  JobThumdownReason,
  JobThumdownReasonSchema,
} from './schemas/job-thumdown-reason.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobThumdownReasonService } from './job-thumdown-reason.service';
import { JobThumdownReasonController } from './job-thumdown-reason.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobThumdownReason.name,
        schema: JobThumdownReasonSchema,
      },
    ]),
  ],
  controllers: [JobThumdownReasonController],
  providers: [JobThumdownReasonService],
})
export class JobThumdownReasonModule {}
