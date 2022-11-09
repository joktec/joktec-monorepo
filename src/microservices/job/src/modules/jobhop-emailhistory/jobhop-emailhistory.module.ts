import {
  JobhopEmailHistory,
  JobhopEmailHistorySchema,
} from './schemas/jobhop-emailhistory.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopEmailHistoryService } from './jobhop-emailhistory.service';
import { JobhopEmailHistoryController } from './jobhop-emailhistory.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopEmailHistory.name,
        schema: JobhopEmailHistorySchema,
      },
    ]),
  ],
  controllers: [JobhopEmailHistoryController],
  providers: [JobhopEmailHistoryService],
})
export class JobhopEmailHistoryModule {}
