import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvIndustryInput {
  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameIndustry!: string;
}

@InputType()
export class CreateCvIndustryInput extends BaseCvIndustryInput {}

@InputType()
export class UpdateCvIndustryInput extends BaseCvIndustryInput {
  @Field()
  id!: string;
}

@InputType()
export class CvIndustryPaginationInput extends BasePaginationInput {}

@InputType()
export class CvIndustryConditionInput extends BaseConditionInput {}

@InputType()
export class CvIndustryQueryInput extends BaseQueryInput({
  conditionInput: CvIndustryConditionInput,
  paginationInput: CvIndustryPaginationInput,
})<CvIndustryConditionInput, CvIndustryPaginationInput> {}
