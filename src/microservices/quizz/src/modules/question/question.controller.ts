import {
  BaseMicroserviceController,
  QuestionMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController extends BaseMicroserviceController(
  QuestionMessagePattern,
) {
  constructor(private readonly questionService: QuestionService) {
    super(questionService);
  }
}
