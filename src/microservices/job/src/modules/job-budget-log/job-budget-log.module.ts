import {
  JobBudgetLog,
  JobBudgetLogSchema,
} from './schemas/job-budget-log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBudgetLogService } from './job-budget-log.service';
import { JobBudgetLogController } from './job-budget-log.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBudgetLog.name, schema: JobBudgetLogSchema },
    ]),
  ],
  controllers: [JobBudgetLogController],
  providers: [JobBudgetLogService],
})
export class JobBudgetLogModule {}
