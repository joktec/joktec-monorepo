import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobLevel extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  levelId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  lateUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => Int, {
    nullable: true,
  })
  aiCode: number;
}

@ObjectType()
export class JobLevelDetail extends JobLevel {}

@ObjectType()
export class JobLevelListResponse extends BaseListResponse({
  viewDto: JobLevel,
}) {}
