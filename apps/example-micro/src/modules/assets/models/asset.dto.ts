import { ApiProperty, ApiPropertyOptional } from '@joktec/core';
import { IsNotEmpty, IsOptional } from '@joktec/utils';
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
