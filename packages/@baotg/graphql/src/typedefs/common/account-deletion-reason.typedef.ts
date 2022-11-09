import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class AccountDeletionReason {
  @Field(() => Number, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  reason: string;

  @Field(() => String, {
    nullable: true,
  })
  reasonVi: string;

  @Field(() => Boolean, {
    nullable: true,
  })
  isOther: boolean;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedReason!: object;

  @Field(() => String, { nullable: true })
  value: string;
}

@ObjectType()
export class AccountDeletionReasonDetail extends AccountDeletionReason {}

@ObjectType()
export class AccountDeletionReasonListResponse extends BaseListResponse({
  viewDto: AccountDeletionReason,
}) {}
