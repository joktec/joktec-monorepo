import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseIndustryInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;

  nameEng!: string;

  logo!: string;

  image!: string;

  priority!: number;

  platform!: number;

  imageHighlight!: string;

  isTpActive!: number;

  isFptoActive!: number;

  priorityTop!: number;

  isFptoTop!: number;

  priorityFooter!: number;

  hlLogo!: string;

  hlLogoColor!: string;

  hlImage!: string;

  hlImageHighlight!: string;

  priorityHighlight!: number;

  priorityHighlightFpto!: number;

  urlCode!: string;
}

export class CreateIndustryInput extends BaseIndustryInput implements IBaseCreateInput {}

export class UpdateIndustryInput extends BaseIndustryInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class IndustryPaginationInput extends BasePaginationInput {}

export class IndustryConditionInput extends BaseConditionInput {}

export class IndustryQueryInput extends BaseQueryInput<IndustryConditionInput, IndustryPaginationInput> {}
