import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreatePasswordInput {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  token!: string;

  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password!: string;
}
