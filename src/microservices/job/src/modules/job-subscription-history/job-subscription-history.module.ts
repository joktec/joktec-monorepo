import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobSubscriptionHistoryService } from './job-subscription-history.service';
import { JobSubscriptionHistoryController } from './job-subscription-history.controller';
import {
  JobSubscriptionHistory,
  JobSubscriptionHistorySchema,
} from './schemas/job-subscription-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobSubscriptionHistory.name,
        schema: JobSubscriptionHistorySchema,
      },
    ]),
  ],
  controllers: [JobSubscriptionHistoryController],
  providers: [JobSubscriptionHistoryService],
})
export class JobSubscriptionHistoryModule {}
