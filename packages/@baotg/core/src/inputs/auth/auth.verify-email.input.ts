import { IsNotEmpty } from 'class-validator';

export class VerifyEmailInput {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  code!: string;
}
