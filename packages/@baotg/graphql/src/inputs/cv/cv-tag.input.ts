import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvTagInput {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName!: string;

  @Field(() => String, {
    nullable: true,
  })
  function!: string;

  @Field(() => String, {
    nullable: true,
  })
  subFunction!: string;

  @Field(() => Int, {
    nullable: true,
  })
  bunnyEstimate!: number;

  @Field(() => String, {
    nullable: true,
  })
  salaryCurrency!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobGroups!: string;

  @Field(() => String, {
    nullable: true,
  })
  levelName!: string;

  @Field(() => String, {
    nullable: true,
  })
  skills!: string;
}

@InputType()
export class CreateCvTagInput extends BaseCvTagInput {}

@InputType()
export class UpdateCvTagInput extends BaseCvTagInput {
  @Field()
  id!: string;
}

@InputType()
export class CvTagPaginationInput extends BasePaginationInput {}

@InputType()
export class CvTagConditionInput extends BaseConditionInput {}

@InputType()
export class CvTagQueryInput extends BaseQueryInput({
  conditionInput: CvTagConditionInput,
  paginationInput: CvTagPaginationInput,
})<CvTagConditionInput, CvTagPaginationInput> {}
