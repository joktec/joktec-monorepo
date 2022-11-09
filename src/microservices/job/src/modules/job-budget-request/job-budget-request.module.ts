import {
  JobBudgetRequest,
  JobBudgetRequestSchema,
} from './schemas/job-budget-request.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBudgetRequestService } from './job-budget-request.service';
import { JobBudgetRequestController } from './job-budget-request.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBudgetRequest.name, schema: JobBudgetRequestSchema },
    ]),
  ],
  controllers: [JobBudgetRequestController],
  providers: [JobBudgetRequestService],
})
export class JobBudgetRequestModule {}
