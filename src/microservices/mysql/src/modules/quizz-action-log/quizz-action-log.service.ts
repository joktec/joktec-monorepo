import { BaseService } from './../../service/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizActionLog } from './entities/quizz-action-log.entity';

@Injectable()
export class QuizzActionLogService extends BaseService<QuizActionLog> {
  constructor(
    @InjectRepository(QuizActionLog)
    private quizzActionLogRepository: Repository<QuizActionLog>,
  ) {
    super(quizzActionLogRepository);
  }
}
