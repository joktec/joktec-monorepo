import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
} from 'class-validator';

@InputType()
export class ResendVerificationCodeInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsEmail()
  email: string;
}
