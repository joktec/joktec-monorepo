import {
  ApiProperty,
  ApiPropertyOptional,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Transform,
  Type,
  ValidateNested,
} from '@joktec/core';
import { MongoSchema, Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { orderBy } from 'lodash';
import { Location } from '../../../base';
import { IsCdnUrl } from '../../../utils';
import { Room } from '../../rooms';
import { Setting } from '../../settings';
import { ApartmentStatus, ApartmentType } from './apartment.enum';

@Schema({ collection: 'apartments', textSearch: 'title,subhead', geoSearch: 'location', paranoid: true })
export class Apartment extends MongoSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  @IsNotEmpty({ message: 'CODE_REQUIRED' })
  @ApiProperty({ type: String, required: true, example: 'LF07PPCCCD' })
  code!: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'TITLE_REQUIRED' })
  @ApiProperty({ example: 'Passport' })
  title!: string;

  @Prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  subhead?: string;

  @Prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @Prop({ required: true, enum: ApartmentType })
  @IsNotEmpty({ message: 'APARTMENT_TYPE_REQUIRED' })
  @IsEnum(ApartmentType, { message: 'APARTMENT_TYPE_INVALID' })
  @ApiProperty({ enum: ApartmentType, example: ApartmentType.HOTEL })
  type!: ApartmentType;

  @Prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  image?: string;

  @Prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  thumbnail?: string;

  @Prop({ type: String, default: [] }, PropType.ARRAY)
  @Type(() => String)
  @IsOptional()
  @IsArray()
  @IsCdnUrl({ message: 'LINK_INVALID', each: true })
  @ApiProperty({ type: String, isArray: true })
  gallery?: string[];

  @Prop({ default: 0 })
  @IsOptional()
  @IsPositive({ message: 'ORDER_INVALID' })
  @ApiPropertyOptional()
  order?: number;

  @Prop({ required: true })
  @Type(() => Location)
  @IsNotEmpty({ message: 'ADDRESS_MAP_REQUIRED' })
  @ValidateNested()
  @ApiProperty({ type: Location })
  location!: Location;

  @Prop({ ref: () => Setting, default: [] })
  @Type(() => String)
  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({ type: String, isArray: true })
  settingIds?: Ref<Setting, string>[];

  @Prop({ ref: () => Apartment, default: null })
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  parentId?: Ref<Apartment, string>;

  @Prop({ required: true, enum: ApartmentStatus })
  @IsNotEmpty({ message: 'APARTMENT_STATUS_REQUIRED' })
  @IsEnum(ApartmentStatus, { message: 'APARTMENT_STATUS_INVALID' })
  @ApiProperty({ enum: ApartmentStatus, example: ApartmentStatus.ACTIVATED })
  status!: ApartmentStatus;

  // Virtual
  @Prop({ ref: () => Apartment, foreignField: '_id', localField: 'parentId', justOne: true })
  @Type(() => Apartment)
  @ApiPropertyOptional({ type: Apartment })
  parent?: Ref<Apartment>;

  @Prop({ ref: () => Apartment, foreignField: 'parentId', localField: '_id' })
  @Type(() => Apartment)
  @Transform(({ value }) => (!value ? [] : value.sort((a: Apartment, b: Apartment) => a.order - b.order)))
  @ApiPropertyOptional({ type: Apartment, isArray: true })
  children?: Ref<Apartment>[];

  @Prop({ ref: () => Room, foreignField: 'apartmentId', localField: '_id' })
  @Type(() => Room)
  @Transform(({ value }) => (!value ? [] : orderBy<Room>(value, ['floor', 'roomNumber'], ['asc', 'asc'])))
  @ApiPropertyOptional({ type: Room, isArray: true })
  rooms?: Ref<Room>[];

  @Prop({ ref: () => Setting, foreignField: '_id', localField: 'settingIds' })
  @Type(() => Setting)
  @Transform(({ value }) => (!value ? [] : orderBy<Setting>(value, ['order'], ['asc'])))
  @ApiPropertyOptional({ type: Setting, isArray: true })
  areas?: Ref<Setting>[];
}
