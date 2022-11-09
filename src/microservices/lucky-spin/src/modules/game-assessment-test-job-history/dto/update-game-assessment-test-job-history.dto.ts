import { PartialType } from '@nestjs/mapped-types';
import { CreateGameAssessmentTestJobHistoryDto } from './create-game-assessment-test-job-history.dto';

export class UpdateGameAssessmentTestJobHistoryDto extends PartialType(CreateGameAssessmentTestJobHistoryDto) {
  id: string;
}
