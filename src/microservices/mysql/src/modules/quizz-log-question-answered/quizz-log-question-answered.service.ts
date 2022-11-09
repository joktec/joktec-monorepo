import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './../../service/base.service';
import { Injectable } from '@nestjs/common';
import { QuizLogQuestionAnswered } from './entities/quizz-log-question-answered.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzLogQuestionAnsweredService extends BaseService<QuizLogQuestionAnswered> {
  constructor(
    @InjectRepository(QuizLogQuestionAnswered)
    private quizLogQuestionAnsweredRepository: Repository<QuizLogQuestionAnswered>,
  ) {
    super(quizLogQuestionAnsweredRepository);
  }
}
