import {
  BaseMicroserviceController,
  QuizzLogQuestionAnswerMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzLogQuestionAnswerService } from './quizz-log-question-answer.service';

@Controller('quizz-log-question-answer')
export class QuizzLogQuestionAnswerController extends BaseMicroserviceController(
  QuizzLogQuestionAnswerMessagePattern,
) {
  constructor(private readonly quizzLogQuestionAnswerService: QuizzLogQuestionAnswerService) {
    super(quizzLogQuestionAnswerService);
  }
}
