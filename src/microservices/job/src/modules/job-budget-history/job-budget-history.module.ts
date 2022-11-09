import {
  JobBudgetHistory,
  JobBudgetHistorySchema,
} from './schemas/job-budget-history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBudgetHistoryService } from './job-budget-history.service';
import { JobBudgetHistoryController } from './job-budget-history.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBudgetHistory.name, schema: JobBudgetHistorySchema },
    ]),
  ],
  controllers: [JobBudgetHistoryController],
  providers: [JobBudgetHistoryService],
})
export class JobBudgetHistoryModule {}
