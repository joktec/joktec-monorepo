import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzDto } from './create-quizz.dto';

export class UpdateQuizzDto extends PartialType(CreateQuizzDto) {
  id: string;
}
