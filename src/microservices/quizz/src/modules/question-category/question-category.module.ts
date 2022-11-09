import { Module } from '@nestjs/common';
import { QuestionCategoryService } from './question-category.service';
import { QuestionCategoryController } from './question-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuestionCategory,
  QuestionCategorySchema,
} from './schemas/question-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionCategory.name, schema: QuestionCategorySchema },
    ]),
  ],
  controllers: [QuestionCategoryController],
  providers: [QuestionCategoryService],
})
export class QuestionCategoryModule {}
