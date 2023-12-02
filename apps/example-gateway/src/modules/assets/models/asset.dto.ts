import { ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional } from '@joktec/core';
import { Asset } from './asset';

export class AssetPresignedDto {
  @IsNotEmpty()
  @ApiProperty()
  filename!: string;

  @IsOptional()
  @ApiPropertyOptional()
  contentType?: string;
}

export class AssetPresigned extends Asset {
  @ApiPropertyOptional()
  presignedUrl?: string;
}
