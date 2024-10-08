import { ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional } from '@joktec/core';
import { Asset } from '../../../models/schemas';

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
