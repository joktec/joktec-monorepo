import { BaseService } from './../../service/base.service';
import { Injectable } from '@nestjs/common';
import { QuizScoreLog } from './entities/quizz-score-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzScoreLogService extends BaseService<QuizScoreLog> {
  constructor(
    @InjectRepository(QuizScoreLog)
    private quizScoreLogRepository: Repository<QuizScoreLog>,
  ) {
    super(quizScoreLogRepository);
  }
}
