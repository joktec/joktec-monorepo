import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { Quiz } from './entities/quizz.entity';
import { JobseekerModule } from '../jobseeker/jobseeker.module';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';
import { QuizzQuestionModule } from '../quizz-question/quizz-question.module';
import { QuizzScoreLogModule } from '../quizz-score-log/quizz-score-log.module';
import { QuizzActionLogModule } from '../quizz-action-log/quizz-action-log.module';
import { GameTurnLogModule } from '../game-turn-log/game-turn-log.module';
import { GameScoreTurnLogModule } from '../game-score-turn-log/game-score-turn-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz]),
    JobseekerModule,
    QuizzMatchLogModule,
    QuizzQuestionModule,
    forwardRef(() => QuizzMatchLogModule),
    QuizzScoreLogModule,
    QuizzActionLogModule,
    GameTurnLogModule,
    GameScoreTurnLogModule,
  ],
  controllers: [QuizzController],
  providers: [QuizzService],
  exports: [QuizzService],
})
export class QuizzModule { }
