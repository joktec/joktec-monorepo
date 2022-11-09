import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobInterviewHistoryService } from './jobinterview-history.service';
import { JobInterviewHistoryController } from './jobinterview-history.controller';
import {
  JobInterviewHistory,
  JobInterviewHistorySchema,
} from './schemas/jobinterview-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobInterviewHistory.name,
        schema: JobInterviewHistorySchema,
      },
    ]),
  ],
  controllers: [JobInterviewHistoryController],
  providers: [JobInterviewHistoryService],
})
export class JobInterviewHistoryModule {}
