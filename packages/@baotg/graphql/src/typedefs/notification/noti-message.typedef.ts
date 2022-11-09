import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class NotiMessage extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  isRead!: number;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  userId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  msgDetailId!: number;
}

@ObjectType()
export class NotiMessageDetail extends NotiMessage {}

@ObjectType()
export class NotiMessageListReponse extends BaseListResponse({
  viewDto: NotiMessage,
}) {}
