import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRBanerActionInput implements IBaseInput {
  userId!: string;

  organizationId!: string;

  jobId!: string;

  extraData!: string;

  bannerId!: number;
}

export class CreateRBanerActionInput extends BaseRBanerActionInput implements IBaseCreateInput {}

export class UpdateRBanerActionInput extends BaseRBanerActionInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RBanerActionPaginationInput extends BasePaginationInput {}

export class RBanerActionConditionInput extends BaseConditionInput {}

export class RBanerActionQueryInput extends BaseQueryInput<RBanerActionConditionInput, RBanerActionPaginationInput> {}
