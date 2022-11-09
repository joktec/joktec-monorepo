import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuggestedSkill extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;
}

@ObjectType()
export class SuggestedSkillDetail extends SuggestedSkill {}

@ObjectType()
export class SuggestedSkillListResponse extends BaseListResponse({
  viewDto: SuggestedSkill,
}) {}

@ObjectType()
export class SuggestedSkillSearchAutocomplete {
  @Field(() => String, {
    nullable: true,
  })
  keyword: string;
}
