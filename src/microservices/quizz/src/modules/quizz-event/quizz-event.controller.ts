import {
  BaseMicroserviceController,
  QuizzEventMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { QuizzEventService } from './quizz-event.service';

@Controller('quizz-event')
export class QuizzEventController extends BaseMicroserviceController(
  QuizzEventMessagePattern,
) {
  constructor(private readonly quizzEventService: QuizzEventService) {
    super(quizzEventService);
  }
}
