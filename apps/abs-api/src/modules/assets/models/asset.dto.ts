import { ApiProperty } from '@joktec/core';
import { Asset } from './asset';

export class AssetFailedDto {
  @ApiProperty({ type: String, required: true, example: 'my_filename.png' })
  title: string;

  @ApiProperty({ type: String, required: true, example: 'image/png' })
  mimeType: string;

  @ApiProperty({ type: Number })
  size: number;
}

export class AssetResponseDto {
  @ApiProperty({ type: Asset, required: true, isArray: true })
  success: Asset[];

  @ApiProperty({ type: AssetFailedDto, required: true, isArray: true })
  failed: AssetFailedDto[];
}
