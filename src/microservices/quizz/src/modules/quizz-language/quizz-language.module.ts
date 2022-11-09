import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { QuizzLanguageService } from './quizz-language.service';
import { QuizzLanguageController } from './quizz-language.controller';
import {
  QuizzLanguage,
  QuizzLanguageSchema,
} from './schemas/quizz-language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: QuizzLanguage.name,
        schema: QuizzLanguageSchema,
      },
    ]),
  ],
  controllers: [QuizzLanguageController],
  providers: [QuizzLanguageService],
})
export class QuizzLanguageModule {}
