import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  Matches,
} from 'class-validator';

@InputType()
export class VerifyEmailInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Field(() => String, {
    nullable: false,
  })
  @Matches(/^[0-9]{1,6}$/, {
    message: 'Code invalid',
  })
  code: string;
}
