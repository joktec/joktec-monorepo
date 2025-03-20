import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@joktec/core';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsUrl } from '@joktec/utils';
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

export class AssetFromUrlDto {
  @IsNotEmpty()
  @IsArray()
  @IsUrl({ protocols: ['http', 'https'] }, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ApiProperty({ isArray: true })
  urls!: string[];
}

export class AssetUpdateDto extends PartialType(PickType(Asset, ['tags'] as const)) {}
