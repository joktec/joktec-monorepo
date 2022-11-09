import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuizzVoteLogService } from './quizz-vote-log.service';
import { QuizzVoteLogController } from './quizz-vote-log.controller';
import { QuizVoteLog } from './entities/quizz-vote-log.entity';
import { QuizzModule } from '../quizz/quizz.module';
import { JobseekerModule } from '../jobseeker/jobseeker.module';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizVoteLog]),
    JobseekerModule,
    QuizzModule,
    QuizzMatchLogModule,
  ],
  controllers: [QuizzVoteLogController],
  providers: [QuizzVoteLogService],
})
export class QuizzVoteLogModule {}
