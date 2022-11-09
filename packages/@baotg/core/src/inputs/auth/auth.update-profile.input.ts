import { IsNotEmpty } from 'class-validator';

export class UpdateProfileInput {
  id!: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  gender!: number;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  phoneNumber!: string;

  address!: string;
  socialLink!: string;
}
