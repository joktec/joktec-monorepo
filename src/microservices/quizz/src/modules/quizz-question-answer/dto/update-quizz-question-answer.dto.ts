import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzQuestionAnswerDto } from './create-quizz-question-answer.dto';

export class UpdateQuizzQuestionAnswerDto extends PartialType(CreateQuizzQuestionAnswerDto) {}
