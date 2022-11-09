import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvMailBox extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  messageId!: string;

  @Field(() => String, {
    nullable: true,
  })
  eventId!: string;

  @Field(() => String, {
    nullable: true,
  })
  domain!: string;

  @Field(() => String, {
    nullable: true,
  })
  sender!: string;

  @Field(() => String, {
    nullable: true,
  })
  targetEmail!: string;

  @Field(() => String, {
    nullable: true,
  })
  fileName!: string;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  timestamp!: Date;

  @Field(() => String, {
    nullable: true,
  })
  storageUrl!: string;

  @Field(() => String, {
    nullable: true,
  })
  strongeKey!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;
}

@ObjectType()
export class CvMailBoxDetail extends CvMailBox {}

@ObjectType()
export class CvMailBoxListReponse extends BaseListResponse({
  viewDto: CvMailBox,
}) {}
