import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../../app.module';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';
import { QuizzModule } from '../quizz/quizz.module';
import { Quizz, QuizzSchema } from '../quizz/schemas/quizz.schema';
import { QuizzVoteLogController } from './quizz-vote-log.controller';
import { QuizzVoteLogService } from './quizz-vote-log.service';
import {
  QuizzVoteLog,
  QuizzVoteLogSchema,
} from './schemas/quizz-vote-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzVoteLog.name, schema: QuizzVoteLogSchema },
      { name: Quizz.name, schema: QuizzSchema },
    ]),
    forwardRef(() => AppModule),
    forwardRef(() => QuizzModule),
    forwardRef(() => QuizzMatchLogModule),
  ],
  controllers: [QuizzVoteLogController],
  providers: [QuizzVoteLogService],
})
export class QuizzVoteLogModule {}
