import {
  BaseMicroserviceController,
  QuizzQuestionMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzQuestionService } from './quizz-question.service';

@Controller('quizz-question')
export class QuizzQuestionController extends BaseMicroserviceController(
  QuizzQuestionMessagePattern,
) {
  constructor(private readonly quizzQuestionService: QuizzQuestionService) {
    super(quizzQuestionService);
  }
}
