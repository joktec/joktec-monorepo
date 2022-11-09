import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordInput {
  id!: string;

  @IsNotEmpty()
  oldPassword!: string;

  @IsNotEmpty()
  newPassword!: string;
}
