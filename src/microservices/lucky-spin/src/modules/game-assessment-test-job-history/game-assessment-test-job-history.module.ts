import {
  GameAssessmentTestJobHistory,
  GameAssessmentTestJobHistorySchema,
} from './schemas/game-assessment-test-job-history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameAssessmentTestJobHistoryService } from './game-assessment-test-job-history.service';
import { GameAssessmentTestJobHistoryController } from './game-assessment-test-job-history.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameAssessmentTestJobHistory.name,
        schema: GameAssessmentTestJobHistorySchema,
      },
    ]),
  ],
  controllers: [GameAssessmentTestJobHistoryController],
  providers: [GameAssessmentTestJobHistoryService],
})
export class GameAssessmentTestJobHistoryModule {}
