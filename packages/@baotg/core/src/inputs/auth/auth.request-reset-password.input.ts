import { IsNotEmpty } from 'class-validator';

export class RequestResetPasswordInput {
  @IsNotEmpty()
  email!: string;
}
