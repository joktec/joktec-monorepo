import {
  BaseMicroserviceController,
  QuizzQuestionMediaMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzQuestionMediaService } from './quizz-question-media.service';

@Controller('quizz-question-media')
export class QuizzQuestionMediaController extends BaseMicroserviceController(
  QuizzQuestionMediaMessagePattern,
) {
  constructor(private readonly quizzQuestionMediaService: QuizzQuestionMediaService) {
    super(quizzQuestionMediaService);
  }
}
