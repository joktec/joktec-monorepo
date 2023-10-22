import { ApiProperty, ApiPropertyOptional } from '@joktec/core';
import { UserProfile } from '../../profile';

export class SendOtpResponse {
  @ApiPropertyOptional({ type: String })
  privateCode?: string;

  @ApiProperty({ type: String })
  activeCode?: string;

  @ApiPropertyOptional({ type: String, example: 1 })
  retry?: number;

  @ApiPropertyOptional({ type: String, example: 30 })
  expiredInSeconds?: number;
}

export class VerifyOtpResponse {
  @ApiProperty({ type: String })
  activeCode!: string;
}

export class TokeResponseDto {
  @ApiProperty({ type: String })
  accessToken!: string;

  @ApiPropertyOptional({ type: String })
  refreshToken?: string;

  @ApiProperty({ type: Date })
  expiredAt!: Date;

  @ApiProperty({ type: UserProfile })
  profile!: UserProfile;
}
