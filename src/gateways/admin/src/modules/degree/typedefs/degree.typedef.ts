import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class DegreeTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  code!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;
}

@ObjectType()
export class DegreeDetailTypedef extends DegreeTypedef {}

@ObjectType()
export class DegreeListResponseTypedef extends BaseListResponse({
  viewDto: DegreeTypedef,
}) {}
