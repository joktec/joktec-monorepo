import {
  ApiProperty,
  ApiPropertyOptional,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  PickType,
} from '@joktec/core';
import { AuthProviderType, OTPType } from '../../../models/constants';
import { User } from '../../../models/schemas';
import { PASSWORD_OPTIONS } from '../../../utils';

export class RequestCodeDto extends PickType(User, ['email'] as const) {
  @IsNotEmpty({ message: 'auth.OTP_TYPE_REQUIRED' })
  @IsEnum(OTPType, { message: 'auth.OTP_TYPE_INVALID' })
  @ApiProperty({ enum: OTPType })
  type!: OTPType;
}

export class VerifyCodeDto {
  @IsNotEmpty({ message: 'auth.OTP_REQUIRED' })
  @ApiProperty({ example: '123321' })
  publicCode!: string;

  @IsNotEmpty({ message: 'auth.PRIVATE_CODE_REQUIRED' })
  @ApiProperty({ example: '1e075969-942c-429c-af79-1d9c53964a5d' })
  privateCode!: string;
}

export class RegisterDto extends PickType(User, ['email', 'nickname', 'avatar'] as const) {
  @IsString()
  @IsNotEmpty({ message: 'auth.ACTIVE_CODE_REQUIRED' })
  @ApiProperty()
  activeCode!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(PASSWORD_OPTIONS, { message: 'auth.PASSWORD_WEEK' })
  @ApiProperty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  confirmedPassword!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fcmToken?: string;
}

export class LoginDto extends PickType(User, ['email'] as const) {
  @IsNotEmpty({ message: 'auth.PASSWORD_REQUIRED' })
  @ApiProperty()
  password!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fcmToken?: string;
}

export class LoginSsoDto {
  @IsNotEmpty()
  @IsEnum(AuthProviderType)
  @ApiProperty({ enum: AuthProviderType })
  providerType!: AuthProviderType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  providerToken!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fcmToken?: string;
}

export class ResetDto extends PickType(User, ['email'] as const) {
  @IsNotEmpty({ message: 'auth.ACTIVE_CODE_REQUIRED' })
  @ApiProperty()
  activeCode!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(PASSWORD_OPTIONS, { message: 'auth.PASSWORD_WEEK' })
  @ApiProperty()
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'auth.CONFIRMED_PASSWORD_REQUIRED' })
  @ApiProperty()
  confirmedPassword!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fcmToken?: string;
}

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'auth.ACCESS_TOKEN_REQUIRED' })
  @ApiProperty()
  accessToken!: string;

  @IsNotEmpty({ message: 'auth.REFRESH_TOKEN_REQUIRED' })
  @ApiProperty()
  refreshToken!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fcmToken?: string;
}
