import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@baotg/graphql';

@ObjectType()
export class SkillTypedef extends BaseTypedef {
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
export class SkillDetailTypedef extends SkillTypedef {}

@ObjectType()
export class SkillListResponseTypedef extends BaseListResponse({
  viewDto: SkillTypedef,
}) {}
