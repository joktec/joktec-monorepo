import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class SettingTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  skey!: string;

  @Field(() => String, {
    nullable: true,
  })
  svalue!: string;
}

@ObjectType()
export class SettingDetailTypedef extends SettingTypedef {}

@ObjectType()
export class SettingListResponseTypedef extends BaseListResponse({
  viewDto: SettingTypedef,
}) {}
