import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class DepartmentTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
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

@ObjectType()
export class DepartmentDetailTypedef extends DepartmentTypedef {}

@ObjectType()
export class DepartmentListResponseTypedef extends BaseListResponse({
  viewDto: DepartmentTypedef,
}) {}
