import { JobBudget, JobBudgetSchema } from './schemas/job-budget.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBudgetService } from './job-budget.service';
import { JobBudgetController } from './job-budget.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBudget.name, schema: JobBudgetSchema },
    ]),
  ],
  controllers: [JobBudgetController],
  providers: [JobBudgetService],
})
export class JobBudgetModule {}
