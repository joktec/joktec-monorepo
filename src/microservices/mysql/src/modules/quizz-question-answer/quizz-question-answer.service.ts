import { QuizQuestionAnswer } from './entities/quizz-question-answer.entity';
import { BaseService } from './../../service/base.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuizzQuestionAnswerService extends BaseService<QuizQuestionAnswer> {
  constructor(
    @InjectRepository(QuizQuestionAnswer)
    private quizQuestionAnswerRepository: Repository<QuizQuestionAnswer>,
  ) {
    super(quizQuestionAnswerRepository);
  }
}
