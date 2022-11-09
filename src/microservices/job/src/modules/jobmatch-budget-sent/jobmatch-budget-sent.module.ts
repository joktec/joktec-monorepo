import {
  JobMatchBudgetSent,
  JobMatchBudgetSentSchema,
} from './schemas/jobmatch-budget-sent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobMatchBudgetSentService } from './jobmatch-budget-sent.service';
import { JobMatchBudgetSentController } from './jobmatch-budget-sent.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobMatchBudgetSent.name,
        schema: JobMatchBudgetSentSchema,
      },
    ]),
  ],
  controllers: [JobMatchBudgetSentController],
  providers: [JobMatchBudgetSentService],
})
export class JobMatchBudgetSentModule {}
