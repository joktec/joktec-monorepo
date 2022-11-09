import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class PlatformTypedef extends BaseTypedef {
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
export class PlatformDetailTypedef extends PlatformTypedef {}

@ObjectType()
export class PlatformListResponseTypedef extends BaseListResponse({
  viewDto: PlatformTypedef,
}) {}
