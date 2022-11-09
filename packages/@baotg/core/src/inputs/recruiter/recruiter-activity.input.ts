import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterActivityInput implements IBaseInput {
  recruiterId!: string;

  organizationId!: string;

  objectId!: string;

  objectRepr!: string;

  objectType!: string;

  activityType!: string;

  message!: string;

  isSystemActivity!: number;

  messageJson!: string;
}

export class CreateRecruiterActivityInput extends BaseRecruiterActivityInput implements IBaseCreateInput {}

export class UpdateRecruiterActivityInput extends BaseRecruiterActivityInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterActivityPaginationInput extends BasePaginationInput {}

export class RecruiterActivityConditionInput extends BaseConditionInput {}

export class RecruiterActivityQueryInput extends BaseQueryInput<
  RecruiterActivityConditionInput,
  RecruiterActivityPaginationInput
> {}
