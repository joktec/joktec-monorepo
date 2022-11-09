import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzScoreLogDto } from './create-quizz-score-log.dto';

export class UpdateQuizzScoreLogDto extends PartialType(CreateQuizzScoreLogDto) {}
