import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzLanguageDto } from './create-quizz-language.dto';

export class UpdateQuizzLanguageDto extends PartialType(CreateQuizzLanguageDto) {
  id: string;
}
