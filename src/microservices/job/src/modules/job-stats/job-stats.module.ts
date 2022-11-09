import { JobStats, JobStatsSchema } from './schemas/job-stats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobStatsService } from './job-stats.service';
import { JobStatsController } from './job-stats.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobStats.name,
        schema: JobStatsSchema,
      },
    ]),
  ],
  controllers: [JobStatsController],
  providers: [JobStatsService],
})
export class JobStatsModule {}
