import {
  ApiProperty,
  ApiPropertyOptional,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Transform,
  Type,
  ValidateNested,
} from '@joktec/core';
import { MongoSchema, prop, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../../utils';
import { CategoryWhiteLabel } from './category-white-label';
import { CategoryStatus, CategoryType } from './category.enum';

@Schema<Category>({ collection: 'categories', textSearch: ['title', 'subhead'], paranoid: true })
export class Category extends MongoSchema {
  @prop({ required: true, trim: true, uppercase: true, immutable: true })
  @IsNotEmpty({ message: 'CODE_REQUIRED' })
  @ApiProperty({ type: String, required: true, example: 'LF07PPCCCD' })
  code!: string;

  @prop({ required: true })
  @IsNotEmpty({ message: 'TITLE_REQUIRED' })
  @ApiProperty({ example: 'Passport' })
  title!: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional()
  subhead?: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @prop({ required: true, enum: CategoryType })
  @IsNotEmpty({ message: 'CATEGORY_TYPE_REQUIRED' })
  @IsEnum(CategoryType, { message: 'CATEGORY_TYPE_INVALID' })
  @ApiProperty({ enum: CategoryType, example: CategoryType.CATALOG })
  type!: CategoryType;

  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  image?: string;

  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  thumbnail?: string;

  @prop({ default: 0 })
  @IsOptional()
  @IsPositive({ message: 'ORDER_INVALID' })
  @ApiPropertyOptional()
  order?: number;

  @prop({ default: 0 })
  @IsNotEmpty({ message: 'COST_REQUIRED' })
  @IsPositive({ message: 'COST_INVALID' })
  @ApiProperty()
  cost!: number;

  @prop({ default: 0 })
  @IsNotEmpty({ message: 'COMMISSION_REQUIRED' })
  @IsPositive({ message: 'COMMISSION_INVALID' })
  @ApiProperty()
  commission!: number;

  @prop({ default: null })
  @Type(() => CategoryWhiteLabel)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional()
  whiteLabel?: CategoryWhiteLabel;

  @prop({ ref: () => Category, default: null })
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  parentId?: Ref<Category, string>;

  @prop({ required: true, enum: CategoryStatus })
  @IsNotEmpty({ message: 'CATEGORY_STATUS_REQUIRED' })
  @IsEnum(CategoryStatus, { message: 'CATEGORY_STATUS_INVALID' })
  @ApiProperty({ enum: CategoryStatus, example: CategoryStatus.ACTIVATED })
  status!: CategoryStatus;

  // Virtual
  @prop({ ref: () => Category, foreignField: '_id', localField: 'parentId', justOne: true })
  @Type(() => Category)
  @ApiPropertyOptional({ type: Category })
  parent?: Ref<Category>;

  @prop({ ref: () => Category, foreignField: 'parentId', localField: '_id' })
  @Type(() => Category)
  @Transform(({ value }) => (!value ? [] : value.sort((a: Category, b: Category) => a.order - b.order)))
  @ApiPropertyOptional({ type: Category, isArray: true })
  children?: Ref<Category>[];
}
