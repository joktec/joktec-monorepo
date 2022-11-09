import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzQuestionDto } from './create-quizz-question.dto';

export class UpdateQuizzQuestionDto extends PartialType(CreateQuizzQuestionDto) {}
