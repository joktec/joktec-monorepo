import { Module, forwardRef } from '@nestjs/common';
import { QuizzScoreLogService } from './quizz-score-log.service';
import { QuizzScoreLogController } from './quizz-score-log.controller';
import {
  QuizzScoreLog,
  QuizzScoreLogSchema,
} from './schemas/quizz-score-log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../../app.module';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzScoreLog.name, schema: QuizzScoreLogSchema },
    ]),
    forwardRef(() => AppModule),
    forwardRef(() => QuizzMatchLogModule),
  ],
  controllers: [QuizzScoreLogController],
  providers: [QuizzScoreLogService],
  exports: [QuizzScoreLogService],
})
export class QuizzScoreLogModule {}
