import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobLocationInput {
  @Field(() => String, {
    nullable: true,
  })
  locationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEn: string;

  @Field(() => String, {
    nullable: true,
  })
  shortName: string;

  @Field(() => String, {
    nullable: true,
  })
  shortNameEn: string;

  @Field(() => String, {
    nullable: true,
  })
  slug: string;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighLight: string;

  @Field(() => String, {
    nullable: true,
  })
  priority: string;

  @Field(() => String, {
    nullable: true,
  })
  locationTypeId: string;

  @Field(() => Number, {
    nullable: true,
  })
  parentId: number;

  @Field(() => String, {
    nullable: true,
  })
  imageKyc: string;

  @Field(() => Number, {
    nullable: true,
  })
  default_district: number;

  @Field(() => String, {
    nullable: true,
  })
  askLocationSelectionImage: string;

  @Field(() => Number, {
    nullable: true,
  })
  isActiveAskLocation: number;
}

@InputType()
export class CreateJobLocationInput extends BaseJobLocationInput {}

@InputType()
export class UpdateJobLocationInput extends BaseJobLocationInput {
  @Field()
  id!: string;
}

@InputType()
export class JobLocationPaginationInput extends BasePaginationInput {}

@InputType()
export class JobLocationConditionInput extends BaseConditionInput {}

@InputType()
export class JobLocationQueryInput extends BaseQueryInput({
  conditionInput: JobLocationConditionInput,
  paginationInput: JobLocationPaginationInput,
})<JobLocationConditionInput, JobLocationPaginationInput> {}
