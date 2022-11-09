import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzEventDto } from './create-quizz-event.dto';

export class UpdateQuizzEventDto extends PartialType(CreateQuizzEventDto) {
  id: string;
}
