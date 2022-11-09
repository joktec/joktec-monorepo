import { BaseDto, BaseListResponseDto } from '../base.dto';

export class BannerDto extends BaseDto {
  file!: string;

  lang!: string;

  active!: number;

  fileMobil!: string;

  validFrom!: Date;

  validUntil!: Date;
}

export class BannerListResponseDto extends BaseListResponseDto<BannerDto> {}
