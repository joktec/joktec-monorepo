import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
