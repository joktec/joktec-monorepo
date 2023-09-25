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
import { MongoSchema, prop, PropType, Ref, Schema } from '@joktec/mongo';
import { orderBy } from 'lodash';
import { Location } from '../../../base';
import { IsCdnUrl } from '../../../utils';
import { Room } from '../../rooms';
import { Setting } from '../../settings';
import { ApartmentStatus, ApartmentType } from './apartment.enum';

@Schema({ collection: 'apartments', textSearch: ['title', 'subhead'], geoSearch: 'location' })
export class Apartment extends MongoSchema {
  @prop({ required: true, trim: true, uppercase: true, immutable: true })
  @IsNotEmpty({ message: 'CODE_REQUIRED' })
  @ApiProperty({ type: String, required: true, example: 'LF07PPCCCD' })
  code!: string;

  @prop({ required: true })
  @IsNotEmpty({ message: 'TITLE_REQUIRED' })
  @ApiProperty({ example: 'Passport' })
  title!: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  subhead?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @prop({ required: true, enum: ApartmentType })
  @IsNotEmpty({ message: 'APARTMENT_TYPE_REQUIRED' })
  @IsEnum(ApartmentType, { message: 'APARTMENT_TYPE_INVALID' })
  @ApiProperty({ enum: ApartmentType, example: ApartmentType.HOTEL })
  type!: ApartmentType;

  @prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  image?: string;

  @prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  thumbnail?: string;

  @prop({ type: String, default: [] }, PropType.ARRAY)
  @Type(() => String)
  @IsOptional()
  @IsArray()
  @IsCdnUrl({ message: 'LINK_INVALID', each: true })
  @ApiProperty({ type: String, isArray: true })
  gallery?: string[];

  @prop({ default: 0 })
  @IsOptional()
  @IsPositive({ message: 'ORDER_INVALID' })
  @ApiPropertyOptional()
  order?: number;

  @prop({ required: true })
  @Type(() => Location)
  @IsNotEmpty({ message: 'ADDRESS_MAP_REQUIRED' })
  @ValidateNested()
  @ApiProperty({ type: Location })
  location!: Location;

  @prop({ ref: () => Setting, default: [] })
  @Type(() => String)
  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({ type: String, isArray: true })
  settingIds?: Ref<Setting, string>[];

  @prop({ ref: () => Apartment, default: null })
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  parentId?: Ref<Apartment, string>;

  @prop({ required: true, enum: ApartmentStatus })
  @IsNotEmpty({ message: 'APARTMENT_STATUS_REQUIRED' })
  @IsEnum(ApartmentStatus, { message: 'APARTMENT_STATUS_INVALID' })
  @ApiProperty({ enum: ApartmentStatus, example: ApartmentStatus.ACTIVATED })
  status!: ApartmentStatus;

  // Virtual
  @prop({ ref: () => Apartment, foreignField: '_id', localField: 'parentId', justOne: true })
  @Type(() => Apartment)
  @ApiPropertyOptional({ type: Apartment })
  parent?: Ref<Apartment>;

  @prop({ ref: () => Apartment, foreignField: 'parentId', localField: '_id' })
  @Type(() => Apartment)
  @Transform(({ value }) => (!value ? [] : value.sort((a: Apartment, b: Apartment) => a.order - b.order)))
  @ApiPropertyOptional({ type: Apartment, isArray: true })
  children?: Ref<Apartment>[];

  @prop({ ref: () => Room, foreignField: 'apartmentId', localField: '_id' })
  @Type(() => Room)
  @Transform(({ value }) => (!value ? [] : orderBy<Room>(value, ['floor', 'roomNumber'], ['asc', 'asc'])))
  @ApiPropertyOptional({ type: Room, isArray: true })
  rooms?: Ref<Room>[];

  @prop({ ref: () => Setting, foreignField: '_id', localField: 'settingIds' })
  @Type(() => Setting)
  @Transform(({ value }) => (!value ? [] : orderBy<Setting>(value, ['order'], ['asc'])))
  @ApiPropertyOptional({ type: Setting, isArray: true })
  areas?: Ref<Setting>[];
}
