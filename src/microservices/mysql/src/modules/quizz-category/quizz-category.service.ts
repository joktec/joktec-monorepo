import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './../../service/base.service';
import { Injectable } from '@nestjs/common';
import { QuizCategory } from './entities/quizz-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzCategoryService extends BaseService<QuizCategory> {
  constructor(
    @InjectRepository(QuizCategory)
    private quizCategoryRepository: Repository<QuizCategory>,
  ) {
    super(quizCategoryRepository);
  }
}
