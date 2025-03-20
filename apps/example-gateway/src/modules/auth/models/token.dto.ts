import { ApiProperty, ApiPropertyOptional } from '@joktec/core';
import { Expose } from '@joktec/utils';
import { isEmpty, isNil } from 'lodash';
import { UserProfileResponse } from '../../profile';

export class SendCodeResponse {
  @ApiPropertyOptional({ type: String })
  privateCode?: string;

  @ApiPropertyOptional({ type: String, example: 1 })
  retry?: number;

  @ApiPropertyOptional({ type: String, example: 30 })
  expiredInSeconds?: number;
}

export class VerifyCodeResponse {
  @ApiProperty({ type: String })
  activeCode!: string;
}

export class TokeResponseDto {
  @Expose({ toPlainOnly: true })
  @ApiProperty()
  get isFirstLogin(): boolean {
    return isNil(this.profile.nickname) || isEmpty(this.profile.nickname);
  }

  @ApiProperty({ type: String })
  accessToken!: string;

  @ApiPropertyOptional({ type: String })
  refreshToken?: string;

  @ApiProperty({ type: Date })
  expiredAt!: Date;

  @ApiProperty({ type: UserProfileResponse })
  profile!: UserProfileResponse;
}
