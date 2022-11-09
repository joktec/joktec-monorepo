import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvTag extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName!: string;

  @Field(() => String, {
    nullable: true,
  })
  function!: string;

  @Field(() => String, {
    nullable: true,
  })
  subFunction!: string;

  @Field(() => Int, {
    nullable: true,
  })
  bunnyEstimate!: number;

  @Field(() => String, {
    nullable: true,
  })
  salaryCurrency!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobGroups!: string;

  @Field(() => String, {
    nullable: true,
  })
  levelName!: string;

  @Field(() => String, {
    nullable: true,
  })
  skills!: string;
}

@ObjectType()
export class CvTagDetail extends CvTag {}

@ObjectType()
export class CvTagListReponse extends BaseListResponse({
  viewDto: CvTag,
}) {}
