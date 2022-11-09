import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRBannerInput implements IBaseInput {
  file!: string;

  lang!: string;

  link!: string;

  position!: string;

  page!: string;

  createdAt!: Date;

  updatedAt!: Date;

  validFrom!: Date;

  validUntil!: Date;

  active!: number;

  description!: string;
}

export class CreateRBannerInput extends BaseRBannerInput implements IBaseCreateInput {}

export class UpdateRBannerInput extends BaseRBannerInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RBannerPaginationInput extends BasePaginationInput {}

export class RBannerConditionInput extends BaseConditionInput {}

export class RBannerQueryInput extends BaseQueryInput<RBannerConditionInput, RBannerPaginationInput> {}
