import { ApiProperty, IsArray, IsDate, IsMongoId, IsNotEmpty, Type } from '@joktec/core';

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
