import {
  ApiProperty,
  ApiPropertyOptional,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Type,
  ValidateNested,
} from '@joktec/core';
import { MongoSchema, prop, PropType, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl, ValidateGroup } from '../../../utils';
import { Room } from '../../rooms';
import { User } from '../../users/models';
import { OrderContact } from './order-contact';
import { OrderTimeline } from './order-timeline';
import { OrderStatus, OrderType, PaymentMethod } from './order.enum';

@Schema({ collection: 'orders', textSearch: 'title,subhead', paranoid: true })
export class Order extends MongoSchema {
  @prop({ required: true, trim: true, uppercase: true, immutable: true })
  @IsOptional()
  @ApiProperty({ example: 'RS.R000001' })
  code!: string;

  @prop({ required: true })
  @IsOptional()
  @ApiProperty({ example: 7 })
  sequence!: number;

  @prop({ required: true })
  @IsOptional()
  @ApiProperty({ example: 'Booking no #RS.R000001' })
  title!: string;

  @prop({ type: String, default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  subhead?: string;

  @prop({ type: String, default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @prop({ required: true, enum: OrderType, default: OrderType.BOOKING })
  @IsNotEmpty({ message: 'ORDER_TYPE_REQUIRED', groups: [ValidateGroup.HOOK] })
  @IsEnum(OrderType, { message: 'ORDER_TYPE_INVALID', groups: [ValidateGroup.HOOK] })
  @ApiProperty({ enum: OrderType, example: OrderType.BOOKING })
  type!: OrderType;

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

  @prop({ required: true, type: OrderContact })
  @Type(() => OrderContact)
  @IsNotEmpty({ message: 'ORDER_CONTACT_REQUIRED' })
  @ValidateNested()
  @ApiProperty({ type: OrderContact })
  contact!: OrderContact;

  @prop({ type: Date, required: true }, PropType.ARRAY)
  @IsNotEmpty({ message: 'BOOKING_TIME_REQUIRED' })
  @IsArray({ message: 'BOOKING_TIME_INVALID' })
  @ApiProperty({ isArray: true })
  bookingTime!: Date[];

  @prop({ type: Date, default: null })
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'CHECKIN_TIME_INVALID' })
  @ApiPropertyOptional()
  checkinTime?: Date;

  @prop({ type: Date, default: null })
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'CHECKOUT_TIME_INVALID' })
  @ApiPropertyOptional()
  checkoutTime?: Date;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Busy' })
  cancelReason?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Out of service' })
  rejectReason?: string;

  @prop({ required: true, enum: PaymentMethod, default: PaymentMethod.COD })
  @IsNotEmpty({ message: 'PAYMENT_METHOD_REQUIRED' })
  @IsEnum(PaymentMethod, { message: 'PAYMENT_METHOD_INVALID' })
  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.COD })
  paymentMethod!: PaymentMethod;

  @prop({ required: true, default: 0 })
  @IsOptional()
  @ApiProperty({ example: 500000 })
  serviceFee!: number;

  @prop({ required: true, ref: () => Room })
  @Type(() => String)
  @IsNotEmpty({ message: 'ROOM_ID_REQUIRED', groups: [ValidateGroup.HOOK] })
  @ApiProperty({ type: String })
  roomId!: Ref<Room, string>;

  @prop({ required: true, ref: () => User })
  @Type(() => String)
  @IsNotEmpty({ message: 'USER_ID_REQUIRED' })
  @ApiProperty({ type: String })
  userId!: Ref<User, string>;

  @prop({ type: () => OrderTimeline, required: true, default: [] }, PropType.ARRAY)
  @Type(() => OrderTimeline)
  @IsNotEmpty({ message: 'ORDER_TIMELINE_REQUIRED' })
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ type: OrderTimeline, isArray: true })
  timelines!: OrderTimeline[];

  @prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  @IsNotEmpty({ message: 'ORDER_STATUS_REQUIRED' })
  @IsEnum(OrderStatus, { message: 'ORDER_STATUS_INVALID' })
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING })
  status!: OrderStatus;

  // Virtual
  @prop({ ref: () => Room, foreignField: '_id', localField: 'roomId', justOne: true })
  @Type(() => Room)
  @ApiPropertyOptional({ type: Room })
  room?: Ref<Room>;

  @prop({ ref: () => User, foreignField: '_id', localField: 'userId', justOne: true })
  @Type(() => User)
  @ApiPropertyOptional({ type: User })
  user?: Ref<User>;
}
