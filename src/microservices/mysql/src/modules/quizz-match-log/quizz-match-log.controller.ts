import { Controller } from '@nestjs/common';
import { QuizzMatchLogService } from './quizz-match-log.service';

@Controller()
export class QuizzMatchLogController {
  constructor(private readonly quizzMatchLogService: QuizzMatchLogService) {}
}
