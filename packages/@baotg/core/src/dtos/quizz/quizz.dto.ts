import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzDto extends BaseDto {
  name!: string;

  nameVi!: string;

  description!: string;

  descriptionVi!: string;

  numberOfVisitor!: number;

  numberOfPlayer!: number;

  numberOfVote!: number;

  upvotePercent!: number;

  logo!: string;

  banner!: string;

  category!: string;

  organization!: string;

  level!: string;

  duration!: number;

  type!: string;

  tags!: string;

  numberOfQuestions!: number;

  whitelist!: string;

  mode!: string;

  isFreeToPlay!: number;

  hideResults!: number;

  eventTag!: string;

  language!: string;
}

export class QuizzListReponseDto extends BaseListResponseDto<QuizzDto> {}
