import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzVoteLogDto } from './create-quizz-vote-log.dto';

export class UpdateQuizzVoteLogDto extends PartialType(CreateQuizzVoteLogDto) {}
