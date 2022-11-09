import { Controller } from '@nestjs/common';
import { QuizzScoreLogService } from './quizz-score-log.service';

@Controller()
export class QuizzScoreLogController {
  constructor(private readonly quizzScoreLogService: QuizzScoreLogService) {}
}
