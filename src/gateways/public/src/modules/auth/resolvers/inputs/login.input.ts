import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

// import { LoginInput as LoginInputDefault } from '@jobhopin/core';

@InputType()
export class LoginInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsEmail()
  username: string;

  @Field(() => String, {
    nullable: false,
  })
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
