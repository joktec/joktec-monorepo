import {
  ApiProperty,
  ApiPropertyOptional,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Type,
  ValidateNested,
} from '@joktec/core';
import { MongoSchema, Prop, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../../utils';
import { Apartment } from '../../apartments';
import { CategoryWhiteLabel } from './category-white-label';
import { CategoryStatus, CategoryType } from './category.enum';

@Schema<Category>({ collection: 'categories', textSearch: 'title,subhead', unique: 'code', paranoid: true })
export class Category extends MongoSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  @IsNotEmpty({ message: 'CODE_REQUIRED' })
  @ApiProperty({ type: String, required: true, example: 'LF07PPCCCD' })
  code!: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'TITLE_REQUIRED' })
  @ApiProperty({ example: 'Passport' })
  title!: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional()
  subhead?: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @Prop({ required: true, enum: CategoryType })
  @IsNotEmpty({ message: 'CATEGORY_TYPE_REQUIRED' })
  @IsEnum(CategoryType, { message: 'CATEGORY_TYPE_INVALID' })
  @ApiProperty({ enum: CategoryType, example: CategoryType.CATALOG })
  type!: CategoryType;

  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  image?: string;

  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  thumbnail?: string;

  @Prop({ default: 0 })
  @IsOptional()
  @IsPositive({ message: 'ORDER_INVALID' })
  @ApiPropertyOptional()
  order?: number;

  @Prop({ default: 0 })
  @IsNotEmpty({ message: 'COST_REQUIRED' })
  @IsPositive({ message: 'COST_INVALID' })
  @ApiProperty()
  cost!: number;

  @Prop({ default: 0 })
  @IsNotEmpty({ message: 'COMMISSION_REQUIRED' })
  @IsPositive({ message: 'COMMISSION_INVALID' })
  @ApiProperty()
  commission!: number;

  @Prop({ default: null })
  @Type(() => CategoryWhiteLabel)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional()
  whiteLabel?: CategoryWhiteLabel;

  @Prop({ ref: () => Category, default: null, strictRef: true })
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  parentId?: Ref<Category, string>;

  @Prop({ ref: () => Apartment, default: [], strictRef: true })
  @Type(() => String)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ type: String, isArray: true })
  apartmentIds?: Ref<Apartment, string>[];

  @Prop({ required: true, enum: CategoryStatus })
  @IsNotEmpty({ message: 'CATEGORY_STATUS_REQUIRED' })
  @IsEnum(CategoryStatus, { message: 'CATEGORY_STATUS_INVALID' })
  @ApiProperty({ enum: CategoryStatus, example: CategoryStatus.ACTIVATED })
  status!: CategoryStatus;

  // Virtual
  @Prop({ ref: () => Category, foreignField: '_id', localField: 'parentId', justOne: true })
  @Type(() => Category)
  @ApiPropertyOptional({ type: Category })
  parent?: Ref<Category>;

  @Prop({
    ref: () => Category,
    foreignField: 'parentId',
    localField: '_id',
    strictRef: true,
    match: { type: CategoryType.SERVICE },
    options: { sort: { order: 1 } },
  })
  @Type(() => Category)
  @ApiPropertyOptional({ type: Category, isArray: true })
  children?: Ref<Category>[];
}
