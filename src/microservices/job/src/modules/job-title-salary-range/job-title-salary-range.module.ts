import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobTitleSalaryRangeService } from './job-title-salary-range.service';
import { JobTitleSalaryRangeController } from './job-title-salary-range.controller';
import {
  JobTitleSalaryRange,
  JobTitleSalaryRangeSchema,
} from './schemas/job-title-salary-range.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobTitleSalaryRange.name,
        schema: JobTitleSalaryRangeSchema,
      },
    ]),
  ],
  controllers: [JobTitleSalaryRangeController],
  providers: [JobTitleSalaryRangeService],
})
export class JobTitleSalaryRangeModule {}
