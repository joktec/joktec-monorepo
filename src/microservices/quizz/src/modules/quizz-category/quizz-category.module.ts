import { Module } from '@nestjs/common';
import { QuizzCategoryService } from './quizz-category.service';
import { QuizzCategoryController } from './quizz-category.controller';
import {
  QuizzCategory,
  QuizzCategorySchema,
} from './schemas/quizz-category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Quizz, QuizzSchema } from '../quizz/schemas/quizz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzCategory.name, schema: QuizzCategorySchema },
      { name: Quizz.name, schema: QuizzSchema },
    ]),
  ],
  controllers: [QuizzCategoryController],
  providers: [QuizzCategoryService],
})
export class QuizzCategoryModule {}
