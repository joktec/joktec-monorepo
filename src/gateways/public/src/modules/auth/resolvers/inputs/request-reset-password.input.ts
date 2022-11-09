import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
} from 'class-validator';

@InputType()
export class RequestResetPasswordInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsEmail()
  email: string;
}
