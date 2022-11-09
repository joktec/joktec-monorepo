import { Controller } from '@nestjs/common';
import { QuizzActionLogService } from './quizz-action-log.service';

@Controller()
export class QuizzActionLogController {
  constructor(private readonly quizzActionLogService: QuizzActionLogService) {}
}
