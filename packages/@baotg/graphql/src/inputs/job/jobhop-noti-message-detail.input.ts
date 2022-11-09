import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopNotiMessageDetailInput {
  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  subject: string;

  @Field(() => String, { nullable: true })
  subjectEn: string;

  @Field(() => String, { nullable: true })
  body: string;

  @Field(() => String, { nullable: true })
  bodyEn: string;

  @Field(() => String, { nullable: true })
  msgType: string;

  @Field(() => Number, { nullable: true })
  iconType: number;

  @Field(() => String, { nullable: true })
  extraData: string;
}

@InputType()
export class CreateJobhopNotiMessageDetailInput extends BaseJobhopNotiMessageDetailInput {}

@InputType()
export class UpdateJobhopNotiMessageDetailInput extends BaseJobhopNotiMessageDetailInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopNotiMessageDetailPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopNotiMessageDetailConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopNotiMessageDetailQueryInput extends BaseQueryInput({
  conditionInput: JobhopNotiMessageDetailConditionInput,
  paginationInput: JobhopNotiMessageDetailPaginationInput,
})<JobhopNotiMessageDetailConditionInput, JobhopNotiMessageDetailPaginationInput> {}
