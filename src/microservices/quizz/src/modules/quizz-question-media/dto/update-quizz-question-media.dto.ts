import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzQuestionMediaDto } from './create-quizz-question-media.dto';

export class UpdateQuizzQuestionMediaDto extends PartialType(CreateQuizzQuestionMediaDto) {}
