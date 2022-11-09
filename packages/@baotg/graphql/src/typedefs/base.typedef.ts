import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class BaseTypedef {
  @Field(() => String, {
    description: 'MongoDB ID',
    nullable: true,
  })
  _id!: string;

  @Field(() => GraphQLJSON)
  localizedName: object;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createdBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  sqlId!: string | number;

  @Field(() => Int, {
    nullable: true,
  })
  isActive!: number | boolean;
}

@ObjectType()
export class BasePagination {
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

@ObjectType()
export class BaseCondition {
  @Field(() => Boolean, {
    nullable: true,
    defaultValue: true,
  })
  includeTotalItems!: boolean;

  @Field(() => String, {
    nullable: true,
  })
  keyword!: string;
}

export const BaseListResponse = ({
  viewDto,
  conditionTypedef = BaseCondition,
  paginationTypdef = BasePagination,
}: any): any => {
  @ObjectType()
  class BaseListResponse<
    DTO,
    CONDITION extends BaseCondition = BaseCondition,
    PAGINATION extends BasePagination = BasePagination,
  > {
    @Field(() => [viewDto], {
      nullable: true,
    })
    items: DTO[] = [];

    @Field(() => paginationTypdef, {
      nullable: true,
    })
    pagination!: PAGINATION;

    @Field(() => conditionTypedef, {
      nullable: true,
    })
    condition!: CONDITION;

    @Field(() => Int, {
      nullable: true,
      defaultValue: 0,
    })
    totalItems: number = 0;
  }
  return BaseListResponse;
};
