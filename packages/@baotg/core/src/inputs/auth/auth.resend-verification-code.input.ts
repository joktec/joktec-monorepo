import { IsNotEmpty } from 'class-validator';

export class ResendVerificationCodeInput {
  @IsNotEmpty()
  email!: string;
}
