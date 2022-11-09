import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '../base.typedef';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Department extends BaseTypedef {
  @Field(() => Number, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  value: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;

  @Field(() => String, {
    nullable: true,
  })
  departmentId: string;
}

@ObjectType()
export class DepartmentDetail extends Department {}

@ObjectType()
export class DepartmentListResponse extends BaseListResponse({
  viewDto: Department,
}) {}
