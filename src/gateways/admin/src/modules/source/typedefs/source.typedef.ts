import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class SourceTypedef extends BaseTypedef {
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
export class SourceDetailTypedef extends SourceTypedef {}

@ObjectType()
export class SourceListResponseTypedef extends BaseListResponse({
  viewDto: SourceTypedef,
}) {}
