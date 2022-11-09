import {
  BaseMicroserviceController,
  QuizzLanguageMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzLanguageService } from './quizz-language.service';

@Controller('quizz-language')
export class QuizzLanguageController extends BaseMicroserviceController(
  QuizzLanguageMessagePattern,
) {
  constructor(private readonly quizzLanguageService: QuizzLanguageService) {
    super(quizzLanguageService);
  }
}
