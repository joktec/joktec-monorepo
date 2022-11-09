import {
  JobBudgetRequestAdded,
  JobBudgetRequestAddedSchema,
} from './schemas/job-budget-request-added.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBudgetRequestAddedService } from './job-budget-request-added.service';
import { JobBudgetRequestAddedController } from './job-budget-request-added.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBudgetRequestAdded.name, schema: JobBudgetRequestAddedSchema },
    ]),
  ],
  controllers: [JobBudgetRequestAddedController],
  providers: [JobBudgetRequestAddedService],
})
export class JobBudgetRequestAddedModule {}
