import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobIndustryInput {
  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => Date, {
    nullable: true,
  })
  lateUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => String, {
    nullable: true,
  })
  logo: string;

  @Field(() => String, {
    nullable: true,
  })
  logoColor: string;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight: string;

  @Field(() => Number, {
    nullable: true,
  })
  prioritySearch: number;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;

  @Field(() => Number, {
    nullable: true,
  })
  isTpActive: number;

  @Field(() => Number, {
    nullable: true,
  })
  platform: number;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoActive: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityTop: number;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoTop: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityFooter: number;

  @Field(() => String, {
    nullable: true,
  })
  hlLogo: string;

  @Field(() => String, {
    nullable: true,
  })
  hlLogoColor: string;

  @Field(() => String, {
    nullable: true,
  })
  hlImage: string;

  @Field(() => String, {
    nullable: true,
  })
  hlImageHighlight: string;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlight: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlightFpto: number;

  @Field(() => String, {
    nullable: true,
  })
  urlCode: string;
}

@InputType()
export class CreateJobIndustryInput extends BaseJobIndustryInput {}

@InputType()
export class UpdateJobIndustryInput extends BaseJobIndustryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobIndustryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobIndustryConditionInput extends BaseConditionInput {}

@InputType()
export class JobIndustryQueryInput extends BaseQueryInput({
  conditionInput: JobIndustryConditionInput,
  paginationInput: JobIndustryPaginationInput,
})<JobIndustryConditionInput, JobIndustryPaginationInput> {}
