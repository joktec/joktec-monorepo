import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterInput implements IBaseInput {
  recruiterId!: string;

  description!: string;

  disabled!: number;

  email!: string;

  locked!: number;

  logo!: string;

  name!: string;

  organizationId!: string;

  title!: string;

  userId!: string;

  username!: string;

  deleted!: number;

  introducedJobmatched!: number;

  mailchimpSyncAt!: Date;

  activecampaignSyncAt!: Date;

  activecampaignContactId!: string;

  platform!: number;

  hsContactId!: string;
}

export class CreateRecruiterInput extends BaseRecruiterInput implements IBaseCreateInput {}

export class UpdateRecruiterInput extends BaseRecruiterInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterPaginationInput extends BasePaginationInput {}

export class RecruiterConditionInput extends BaseConditionInput {}

export class RecruiterQueryInput extends BaseQueryInput<RecruiterConditionInput, RecruiterPaginationInput> {}
