import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseDistrictInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  name!: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  code!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => Number, {
    nullable: true,
  })
  lat!: number;

  @Field(() => Number, {
    nullable: true,
  })
  lon!: number;

  @Field(() => String, {
    nullable: true,
  })
  parent!: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsNotEmpty()
  city!: string;
}

@InputType()
export class CreateDistrictInput extends BaseDistrictInput {}

@InputType()
export class UpdateDistrictInput extends BaseDistrictInput {
  // @Field()
  // id!: string;
}

@InputType()
export class DistrictPaginationInput extends BasePaginationInput {}

@InputType()
export class DistrictConditionInput extends BaseConditionInput {}

@InputType()
export class DistrictQueryInput extends BaseQueryInput({
  conditionInput: DistrictConditionInput,
  paginationInput: DistrictPaginationInput,
})<DistrictConditionInput, DistrictPaginationInput> {}
