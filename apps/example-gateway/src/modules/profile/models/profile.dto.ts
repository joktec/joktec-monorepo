import {
  ApiProperty,
  ApiPropertyOptional,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  OmitType,
  PickType,
} from '@joktec/core';
import { PASSWORD_OPTIONS } from '../../../utils';
import { User } from '../../users';

export class UserProfile extends OmitType(User, ['hashPassword'] as const) {}

export class UserProfileDto extends PickType(User, [
  'fullName',
  'email',
  'gender',
  'birthday',
  'googleId',
  'facebookId',
  'address',
] as const) {
  @IsOptional()
  @ApiPropertyOptional()
  image?: string;

  @IsOptional()
  @ApiPropertyOptional()
  thumbnail?: string;
}

export class UserPasswordDto {
  @IsOptional()
  @ApiPropertyOptional()
  oldPassword?: string;

  @IsNotEmpty({ message: 'PASSWORD_REQUIRED' })
  @IsStrongPassword(PASSWORD_OPTIONS, { message: 'PASSWORD_WEEK' })
  @ApiProperty()
  password!: string;

  @IsNotEmpty({ message: 'CONFIRMED_PASSWORD_REQUIRED' })
  @ApiProperty()
  confirmedPassword!: string;
}

export class UserFcmDto {
  @IsNotEmpty({ message: 'REGISTRATION_ID_REQUIRED' })
  @ApiProperty()
  registrationId!: string;
}

export class UserLogoutDto {
  @ApiProperty()
  success!: boolean;
}

export class UserRevokeDto {
  @IsNotEmpty({ message: 'TOKEN_IDS_REQUIRED' })
  @IsArray({ message: 'TOKEN_IDS_MUST_BE_ARRAY' })
  @ApiProperty({ isArray: true, default: [] })
  tokenIds!: string[];
}
