import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerSkill extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  level!: string;

  @Field(() => String, {
    nullable: true,
  })
  skill!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@ObjectType()
export class JobSeekerSkillDetail extends JobSeekerSkill {}

@ObjectType()
export class JobSeekerSkillListReponse extends BaseListResponse({
  viewDto: JobSeekerSkill,
}) {}
