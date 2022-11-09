import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvFeedback extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastupdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createdBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvFeedbackId!: string;

  @Field(() => String, {
    nullable: true,
  })
  actor!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;
}

@ObjectType()
export class CvFeedbackDetail extends CvFeedback {}

@ObjectType()
export class CvFeedbackListReponse extends BaseListResponse({
  viewDto: CvFeedback,
}) {}
