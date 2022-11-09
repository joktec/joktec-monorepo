import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class UniversityTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  code!: string;
}

@ObjectType()
export class UniversityDetailTypedef extends UniversityTypedef {}

@ObjectType()
export class UniversityListResponseTypedef extends BaseListResponse({
  viewDto: UniversityTypedef,
}) {}
