import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterContactInput implements IBaseInput {
  fullName!: string;

  phoneNumber!: string;

  email!: string;

  company!: string;

  location!: string;

  referralEmail!: string;
}

export class CreateRecruiterContactInput extends BaseRecruiterContactInput implements IBaseCreateInput {}

export class UpdateRecruiterContactInput extends BaseRecruiterContactInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterContactPaginationInput extends BasePaginationInput {}

export class RecruiterContactConditionInput extends BaseConditionInput {}

export class RecruiterContactQueryInput extends BaseQueryInput<
  RecruiterContactConditionInput,
  RecruiterContactPaginationInput
> {}
