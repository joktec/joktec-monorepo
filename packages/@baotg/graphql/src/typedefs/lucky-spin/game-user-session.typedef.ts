import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class GameUserSession extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  deviceId: string;

  @Field(() => String, {
    nullable: true,
  })
  sqlId: string;
}

@ObjectType()
export class GameUserSessionDetail extends GameUserSession {}

@ObjectType()
export class GameUserSessionListReponse extends BaseListResponse({
  viewDto: GameUserSession,
}) {}
