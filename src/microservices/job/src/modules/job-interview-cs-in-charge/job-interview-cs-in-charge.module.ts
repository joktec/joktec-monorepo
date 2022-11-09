import {
  JobInterviewCsInCharge,
  JobInterviewCsInChargeSchema,
} from './schemas/job-interview-cs-in-charge.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobInterviewCsInChargeService } from './job-interview-cs-in-charge.service';
import { JobInterviewCsInChargeController } from './job-interview-cs-in-charge.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobInterviewCsInCharge.name,
        schema: JobInterviewCsInChargeSchema,
      },
    ]),
  ],
  controllers: [JobInterviewCsInChargeController],
  providers: [JobInterviewCsInChargeService],
})
export class JobInterviewCsInChargeModule {}
