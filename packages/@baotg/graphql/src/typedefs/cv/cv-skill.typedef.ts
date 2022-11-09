import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvSkill extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameSkill!: string;

  @Field(() => String, {
    nullable: true,
  })
  skillId!: string;
}

@ObjectType()
export class CvSkillDetail extends CvSkill {}

@ObjectType()
export class CvSkillListReponse extends BaseListResponse({
  viewDto: CvSkill,
}) {}
