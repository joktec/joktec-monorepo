import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseDepartmentInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority!: number;
}

@InputType()
export class CreateDepartmentInput extends BaseDepartmentInput {}

@InputType()
export class UpdateDepartmentInput extends BaseDepartmentInput {
  // @Field()
  // id!: string;
}

@InputType()
export class DepartmentPaginationInput extends BasePaginationInput {}

@InputType()
export class DepartmentConditionInput extends BaseConditionInput {}

@InputType()
export class DepartmentQueryInput extends BaseQueryInput({
  conditionInput: DepartmentConditionInput,
  paginationInput: DepartmentPaginationInput,
})<DepartmentConditionInput, DepartmentPaginationInput> {}
