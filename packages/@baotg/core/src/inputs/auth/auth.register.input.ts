import { IsNotEmpty } from 'class-validator';

export class RegisterInput {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
