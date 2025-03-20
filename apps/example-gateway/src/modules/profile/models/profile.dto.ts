import { ApiProperty, PickType } from '@joktec/core';
import { IsArray, IsNotEmpty, IsString, IsStrongPassword } from '@joktec/utils';
import { User } from '../../../models/schemas';
import { PASSWORD_OPTIONS } from '../../../utils';

export class UserProfileDto extends PickType(User, [
  'nickname',
  'avatar',
  'profile',
  'address',
  'config',
  'artistIds',
] as const) {}

export class UserPasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'auth.OLD_PASSWORD_REQUIRED' })
  @ApiProperty()
  oldPassword!: string;

  @IsString()
  @IsNotEmpty({ message: 'auth.PASSWORD_REQUIRED' })
  @IsStrongPassword(PASSWORD_OPTIONS, { message: 'auth.PASSWORD_WEEK' })
  @ApiProperty()
  password!: string;

  @IsNotEmpty({ message: 'auth.CONFIRMED_PASSWORD_REQUIRED' })
  @ApiProperty()
  confirmedPassword!: string;
}

export class UserSetPasswordDto extends PickType(UserPasswordDto, ['password', 'confirmedPassword'] as const) {}

export class UserRevokeDto {
  @IsNotEmpty({ message: 'auth.TOKEN_IDS_REQUIRED' })
  @IsArray({ message: 'auth.TOKEN_IDS_MUST_BE_ARRAY' })
  @ApiProperty({ isArray: true, default: [] })
  tokenIds!: string[];
}

export class UserFcmDto {
  @IsNotEmpty({ message: 'auth.FCM_TOKEN_REQUIRED' })
  @IsString()
  @ApiProperty()
  fcmToken!: string;
}
