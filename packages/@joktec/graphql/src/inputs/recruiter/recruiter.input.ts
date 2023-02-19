import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterInput {
  @Field(() => String, {
    nullable: true,
  })
  recruiterId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => Int, {
    nullable: true,
  })
  disabled!: number;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  locked!: number;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  userId!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => Int, {
    nullable: true,
  })
  introducedJobmatched!: number;

  @Field(() => String, {
    nullable: true,
  })
  mailchimpSyncAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  activecampaignSyncAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  activecampaignContactId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

  @Field(() => String, {
    nullable: true,
  })
  hsContactId!: string;
}

@InputType()
export class CreateRecruiterInput extends BaseRecruiterInput {}

@InputType()
export class UpdateRecruiterInput extends BaseRecruiterInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterPaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterQueryInput extends BaseQueryInput({
  conditionInput: RecruiterConditionInput,
  paginationInput: RecruiterPaginationInput,
})<RecruiterConditionInput, RecruiterPaginationInput> {}
