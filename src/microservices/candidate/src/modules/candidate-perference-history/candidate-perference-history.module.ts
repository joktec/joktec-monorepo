import { Module } from '@nestjs/common';
import { CandidatePerferenceHistoryService } from './candidate-perference-history.service';
import { CandidatePerferenceHistoryController } from './candidate-perference-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidatePerferenceHistory,
  CandidatePerferenceHistorySchema,
} from './schemas/candidate-perference-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CandidatePerferenceHistory.name,
        schema: CandidatePerferenceHistorySchema,
      },
    ]),
  ],
  controllers: [CandidatePerferenceHistoryController],
  providers: [CandidatePerferenceHistoryService],
})
export class CandidatePerferenceHistoryModule {}
