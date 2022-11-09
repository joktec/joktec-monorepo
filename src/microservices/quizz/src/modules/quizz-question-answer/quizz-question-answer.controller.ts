import {
  BaseMicroserviceController,
  QuizzQuestionAnswerMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzQuestionAnswerService } from './quizz-question-answer.service';

@Controller('quizz-question-answer')
export class QuizzQuestionAnswerController extends BaseMicroserviceController(
  QuizzQuestionAnswerMessagePattern,
) {
  constructor(private readonly quizzQuestionAnswerService: QuizzQuestionAnswerService) {
    super(quizzQuestionAnswerService);
  }
}
