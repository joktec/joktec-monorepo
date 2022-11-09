import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuizzCategoryService } from './quizz-category.service';
import { QuizzCategoryController } from './quizz-category.controller';
import { QuizCategory } from './entities/quizz-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizCategory])],
  controllers: [QuizzCategoryController],
  providers: [QuizzCategoryService],
})
export class QuizzCategoryModule {}
