import {
  RecruiterLastActivityDate,
  RecruiterLastActivityDateSchema,
} from './schemas/recruiter-last-activity-date.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterLastActivityDateService } from './recruiter-last-activity-date.service';
import { RecruiterLastActivityDateController } from './recruiter-last-activity-date.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterLastActivityDate.name,
        schema: RecruiterLastActivityDateSchema,
      },
    ]),
  ],
  controllers: [RecruiterLastActivityDateController],
  providers: [RecruiterLastActivityDateService],
})
export class RecruiterLastActivityDateModule {}
