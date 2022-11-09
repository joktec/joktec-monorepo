import {
  JobBudgetSuggestInfo,
  JobBudgetSuggestInfoSchema,
} from './schemas/job-budget-suggest-info.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBudgetSuggestInfoService } from './job-budget-suggest-info.service';
import { JobBudgetSuggestInfoController } from './job-budget-suggest-info.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBudgetSuggestInfo.name, schema: JobBudgetSuggestInfoSchema },
    ]),
  ],
  controllers: [JobBudgetSuggestInfoController],
  providers: [JobBudgetSuggestInfoService],
})
export class JobBudgetSuggestInfoModule {}
