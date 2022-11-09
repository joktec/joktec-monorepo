import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzLogQuestionAnswerDto } from './create-quizz-log-question-answer.dto';

export class UpdateQuizzLogQuestionAnswerDto extends PartialType(CreateQuizzLogQuestionAnswerDto) {}
