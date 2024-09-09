import {
  ApiProperty,
  ApiPropertyOptional,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsUrl,
  PartialType,
  PickType,
  Type,
} from '@joktec/core';
import { ArticleFile } from '../../../models/objects';
import { Article } from '../../../models/schemas';

export class ArticleFileCreateDto extends PickType(ArticleFile, [
  'caption',
  'type',
  'url',
  'preview',
  'originalUrl',
  'mimetype',
  'width',
  'height',
  'ratio',
  'seq',
  'elements',
  'filter',
] as const) {}

export class ArticleCreateDto extends PartialType(
  PickType(Article, ['title', 'subhead', 'description', 'tagIds', 'artistIds', 'rawHashtags'] as const),
  { skipNullProperties: true },
) {
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: ArticleFileCreateDto, isArray: true })
  files!: ArticleFileCreateDto[];
}

export class ArticleShareDto {
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'] })
  @ApiPropertyOptional()
  deepLink?: string;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  payload?: Record<string, any>;
}

export class ArticleViewItemDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  articleId!: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  actionAt!: Date;
}

export class ArticleViewDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: ArticleViewItemDto, isArray: true })
  viewItems!: ArticleViewItemDto[];
}
