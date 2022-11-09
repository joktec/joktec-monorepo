import {
  JobBountyHistory,
  JobBountyHistorySchema,
} from './schemas/job-bounty-history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBountyHistoryService } from './job-bounty-history.service';
import { JobBountyHistoryController } from './job-bounty-history.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBountyHistory.name, schema: JobBountyHistorySchema },
    ]),
  ],
  controllers: [JobBountyHistoryController],
  providers: [JobBountyHistoryService],
})
export class JobBountyHistoryModule {}
