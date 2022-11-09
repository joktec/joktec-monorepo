import { Controller } from '@nestjs/common';
import { QuizzQuestionAnswerService } from './quizz-question-answer.service';

@Controller()
export class QuizzQuestionAnswerController {
  constructor(private readonly quizzQuestionAnswerService: QuizzQuestionAnswerService) {}
}
