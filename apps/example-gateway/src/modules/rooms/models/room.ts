import {
  ApiProperty,
  ApiPropertyOptional,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Transform,
  Type,
  ValidateNested,
} from '@joktec/core';
import { index, modelOptions, MongoSchema, prop, PropType, Ref } from '@joktec/mongo';
import { orderBy } from 'lodash';
import { IsCdnUrl } from '../../../utils';
import { Apartment } from '../../apartments';
import { Setting } from '../../settings';
import { RoomSchedule } from './room-schedule';
import { RoomStatus, RoomType } from './room.enum';

@index({ title: 'text', subhead: 'text' })
@modelOptions({ schemaOptions: { collection: 'rooms' } })
export class Room extends MongoSchema {
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

  @prop({ required: true, enum: RoomType })
  @IsNotEmpty({ message: 'ROOM_TYPE_REQUIRED' })
  @IsEnum(RoomType, { message: 'ROOM_TYPE_INVALID' })
  @ApiProperty({ enum: RoomType, example: RoomType.PERSONAL })
  type!: RoomType;

  @prop({ required: true })
  @IsNotEmpty({ message: 'FLOOR_REQUIRED' })
  @IsPositive({ message: 'FLOOR_INVALID' })
  @ApiProperty()
  floor!: number;

  @prop({ required: true })
  @IsNotEmpty({ message: 'ROOM_NUMBER_REQUIRED' })
  @IsPositive({ message: 'ROOM_NUMBER_INVALID' })
  @ApiProperty()
  roomNumber!: number;

  @prop({ required: true })
  @IsNotEmpty({ message: 'SLOT_REQUIRED' })
  @IsPositive({ message: 'SLOT_INVALID' })
  @ApiProperty()
  slot!: number;

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

  @prop({ default: 0 })
  @IsNotEmpty({ message: 'ROOM_PRICE_REQUIRED' })
  @IsPositive({ message: 'ROOM_PRICE_INVALID' })
  @ApiProperty()
  price!: number;

  @prop({ required: true, ref: () => Apartment })
  @Type(() => String)
  @IsNotEmpty()
  @ApiProperty({ type: String })
  apartmentId!: Ref<Apartment, string>;

  @prop({ required: true, ref: () => Setting, default: [] }, PropType.ARRAY)
  @Type(() => String)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ type: String, isArray: true })
  settingIds!: Ref<Setting, string>[];

  @prop({ type: RoomSchedule, required: true, default: [] }, PropType.ARRAY)
  @Type(() => RoomSchedule)
  @IsArray()
  @ValidateNested({ each: true })
  @ApiPropertyOptional({ type: RoomSchedule, isArray: true })
  schedules!: RoomSchedule[];

  @prop({ required: true, enum: RoomStatus })
  @IsNotEmpty({ message: 'ROOM_STATUS_REQUIRED' })
  @IsEnum(RoomStatus, { message: 'ROOM_STATUS_INVALID' })
  @ApiProperty({ enum: RoomStatus, example: RoomStatus.ACTIVATED })
  status!: RoomStatus;

  // Virtual
  @prop({ ref: () => Apartment, foreignField: '_id', localField: 'apartmentId', justOne: true })
  @Type(() => Apartment)
  @ApiPropertyOptional({ type: Apartment })
  apartment?: Ref<Apartment>;

  @prop({ ref: () => Setting, foreignField: '_id', localField: 'settingIds' })
  @Type(() => Setting)
  @Transform(({ value }) => (!value ? [] : orderBy<Setting>(value, ['order'], ['asc'])))
  @ApiPropertyOptional({ type: Setting, isArray: true })
  utilities?: Ref<Setting>[];
}
