import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Field(() => String, {
    nullable: false,
  })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
