import { ApiProperty } from '@joktec/core';
import { UserProfile } from '../../profile';

export class SendOtpResponse {
  @ApiProperty({ type: String, required: false })
  privateCode?: string;

  @ApiProperty({ type: String, required: true })
  activeCode?: string;

  @ApiProperty({ type: String, required: false, example: 1 })
  retry?: number;

  @ApiProperty({ type: String, required: false, example: 30 })
  expiredInSeconds?: number;
}

export class VerifyOtpResponse {
  @ApiProperty({ type: String, required: true })
  activeCode!: string;
}

export class TokeResponseDto {
  @ApiProperty({ type: String, required: true })
  accessToken!: string;

  @ApiProperty({ type: String, required: true })
  refreshToken!: string;

  @ApiProperty({ type: Date, required: true })
  expiredAt!: Date;

  @ApiProperty({ type: UserProfile, required: true })
  profile: UserProfile;
}
