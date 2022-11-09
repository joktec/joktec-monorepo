import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopJobSetting extends BaseTypedef {
  @Field(() => Number, { nullable: true })
  additionalView: number;
}

@ObjectType()
export class JobhopJobSettingDetail extends JobhopJobSetting {}

@ObjectType()
export class JobhopJobSettingListResponse extends BaseListResponse({
  viewDto: JobhopJobSetting,
}) {}
