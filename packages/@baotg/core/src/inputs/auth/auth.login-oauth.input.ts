import { IsNotEmpty, IsEnum } from 'class-validator';
import { AuthOAuthTypeEnum } from '../../enums';

export class LoginOAuthInput {
  @IsNotEmpty()
  @IsEnum(AuthOAuthTypeEnum)
  type!: AuthOAuthTypeEnum;

  @IsNotEmpty()
  token!: string;
}
