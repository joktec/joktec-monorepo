import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RecruiterActivity extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  userId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  extraData!: string;

  @Field(() => Int, {
    nullable: true,
  })
  bannerId!: number;
}

@ObjectType()
export class RecruiterActivityDetail extends RecruiterActivity {}

@ObjectType()
export class RecruiterActivityListReponse extends BaseListResponse({
  viewDto: RecruiterActivity,
}) {}
