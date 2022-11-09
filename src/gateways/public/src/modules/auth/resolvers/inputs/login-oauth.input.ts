import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { AuthOAuthTypeEnum } from '@jobhopin/core';

registerEnumType(AuthOAuthTypeEnum, {
  name: 'AuthOAuthTypeEnum',
});

@InputType()
export class LoginOAuthInput {
  @Field(() => String, {
    nullable: false,
  })
  token: string;

  @Field(() => AuthOAuthTypeEnum, {
    nullable: false,
  })
  type: AuthOAuthTypeEnum;
}
