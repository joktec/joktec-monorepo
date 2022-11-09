import {
  RecruiterFirstActivityDate,
  RecruiterFirstActivityDateSchema,
} from './schemas/recruiter-first-activity-date.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterFirstActivityDateService } from './recruiter-first-activity-date.service';
import { RecruiterFirstActivityDateController } from './recruiter-first-activity-date.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterFirstActivityDate.name,
        schema: RecruiterFirstActivityDateSchema,
      },
    ]),
  ],
  controllers: [RecruiterFirstActivityDateController],
  providers: [RecruiterFirstActivityDateService],
})
export class RecruiterFirstActivityDateModule {}
