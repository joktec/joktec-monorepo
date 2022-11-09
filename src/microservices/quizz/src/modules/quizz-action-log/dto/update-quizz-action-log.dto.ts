import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzActionLogDto } from './create-quizz-action-log.dto';

export class UpdateQuizzActionLogDto extends PartialType(
  CreateQuizzActionLogDto,
) {
  id: string;
}
