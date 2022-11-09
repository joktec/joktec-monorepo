import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzMatchLogDto } from './create-quizz-match-log.dto';

export class UpdateQuizzMatchLogDto extends PartialType(CreateQuizzMatchLogDto) {}
