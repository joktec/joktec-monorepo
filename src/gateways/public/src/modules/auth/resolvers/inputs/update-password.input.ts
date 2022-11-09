import { InputType, Field } from '@nestjs/graphql';
import {
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String, {
    nullable: false,
  })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  oldPassword: string;

  @Field(() => String, {
    nullable: false,
  })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  newPassword: string;
}
