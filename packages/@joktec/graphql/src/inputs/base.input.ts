import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BaseInput {}

@InputType()
export class BaseCreateInput extends BaseInput {}

@InputType()
export class BaseUpdateInput extends BaseInput {
  @Field(() => String)
  id!: string;
}

@InputType()
export class BasePaginationInput {
  @Field(() => Int, {
    nullable: true,
  })
  page!: number;

  @Field(() => Int, {
    nullable: true,
  })
  pageSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  sortBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  orderBy!: string;
}

@InputType()
export class BaseConditionInput {
  @Field(() => Boolean, {
    nullable: true,
  })
  includeTotalItems!: boolean;

  @Field(() => String, {
    nullable: true,
  })
  keyword!: string;
}

export const BaseQueryInput = ({ conditionInput, paginationInput }: any): any => {
  @InputType()
  class BaseQueryInput<C extends BaseConditionInput, P extends BasePaginationInput> {
    @Field(type => conditionInput, {
      nullable: true,
    })
    condition!: C;
    @Field(type => paginationInput, {
      nullable: true,
    })
    pagination!: P;
  }

  return BaseQueryInput;
};
