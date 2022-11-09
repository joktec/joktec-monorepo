import {
  JobStatsDetail,
  JobStatsDetailSchema,
} from './schemas/job-stats-detail.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobStatsDetailService } from './job-stats-detail.service';
import { JobStatsDetailController } from './job-stats-detail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobStatsDetail.name,
        schema: JobStatsDetailSchema,
      },
    ]),
  ],
  controllers: [JobStatsDetailController],
  providers: [JobStatsDetailService],
})
export class JobStatsDetailModule {}
