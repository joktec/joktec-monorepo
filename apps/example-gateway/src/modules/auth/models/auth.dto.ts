import {
  ApiProperty,
  ApiPropertyOptional,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  PickType,
} from '@joktec/core';
import { PASSWORD_OPTIONS } from '../../../utils';
import { OTPType } from '../../otpLogs';
import { AuthPlatform, User } from '../../users/models';

export class SendOtpDto extends PickType(User, ['phone'] as const) {
  @IsNotEmpty({ message: 'OTP_TYPE_REQUIRED' })
  @IsEnum(OTPType, { message: 'OTP_TYPE_INVALID' })
  @ApiProperty({ enum: OTPType })
  type!: OTPType;
}

export class VerifyOtpDto {
  @IsNotEmpty({ message: 'OTP_REQUIRED' })
  @ApiProperty({ example: '123456' })
  publicCode!: string;

  @IsNotEmpty({ message: 'PRIVATE_CODE_REQUIRED' })
  @ApiProperty({ example: 'XXX' })
  privateCode!: string;
}

export class LoginDto extends PickType(User, ['phone'] as const) {
  @IsNotEmpty({ message: 'PASSWORD_REQUIRED' })
  @ApiProperty()
  password!: string;
}

export class RegisterDto extends PickType(User, [
  'phone',
  'fullName',
  'email',
  'googleId',
  'facebookId',
  'birthday',
  'gender',
] as const) {
  @IsNotEmpty({ message: 'ACTIVE_CODE_REQUIRED' })
  @ApiProperty()
  activeCode!: string;

  @IsOptional()
  @ApiPropertyOptional()
  password?: string;

  @IsOptional()
  @ApiPropertyOptional()
  confirmedPassword?: string;

  @IsOptional()
  @ApiPropertyOptional()
  image?: string;

  @IsOptional()
  @ApiPropertyOptional()
  thumbnail?: string;
}

export class LoginSsoDto {
  @IsNotEmpty({ message: 'SSO_UID_REQUIRED' })
  @ApiProperty()
  ssoId!: string;

  @IsEnum(AuthPlatform)
  @ApiProperty({ enum: AuthPlatform, example: AuthPlatform.GOOGLE })
  platform!: AuthPlatform;
}

export class ResetDto extends PickType(User, ['phone'] as const) {
  @IsNotEmpty({ message: 'ACTIVE_CODE_REQUIRED' })
  @ApiProperty()
  activeCode!: string;

  @IsNotEmpty({ message: 'PASSWORD_REQUIRED' })
  @IsStrongPassword(PASSWORD_OPTIONS, { message: 'PASSWORD_WEEK' })
  @ApiProperty()
  password!: string;

  @IsNotEmpty({ message: 'CONFIRMED_PASSWORD_REQUIRED' })
  @ApiProperty()
  confirmedPassword!: string;
}

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'ACCESS_TOKEN_REQUIRED' })
  @ApiProperty()
  accessToken!: string;

  @IsNotEmpty({ message: 'REFRESH_TOKEN_REQUIRED' })
  @ApiProperty()
  refreshToken!: string;
}
