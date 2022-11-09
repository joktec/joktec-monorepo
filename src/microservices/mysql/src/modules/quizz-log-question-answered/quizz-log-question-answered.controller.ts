import { Controller } from '@nestjs/common';
import { QuizzLogQuestionAnsweredService } from './quizz-log-question-answered.service';

@Controller()
export class QuizzLogQuestionAnsweredController {
  constructor(private readonly quizzLogQuestionAnsweredService: QuizzLogQuestionAnsweredService) {}
}
