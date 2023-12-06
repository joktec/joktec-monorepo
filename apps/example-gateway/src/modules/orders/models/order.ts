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
import { MongoSchema, Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl, ValidateGroup } from '../../../utils';
import { Room } from '../../rooms';
import { User } from '../../users/models';
import { OrderContact } from './order-contact';
import { OrderTimeline } from './order-timeline';
import { OrderStatus, OrderType, PaymentMethod } from './order.enum';

@Schema({ collection: 'orders', textSearch: 'title,subhead', paranoid: true })
export class Order extends MongoSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  @IsOptional()
  @ApiProperty({ example: 'RS.R000001' })
  code!: string;

  @Prop({ required: true })
  @IsOptional()
  @ApiProperty({ example: 7 })
  sequence!: number;

  @Prop({ required: true })
  @IsOptional()
  @ApiProperty({ example: 'Booking no #RS.R000001' })
  title!: string;

  @Prop({ type: String, default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  subhead?: string;

  @Prop({ type: String, default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @Prop({ required: true, enum: OrderType, default: OrderType.BOOKING })
  @IsNotEmpty({ message: 'ORDER_TYPE_REQUIRED', groups: [ValidateGroup.HOOK] })
  @IsEnum(OrderType, { message: 'ORDER_TYPE_INVALID', groups: [ValidateGroup.HOOK] })
  @ApiProperty({ enum: OrderType, example: OrderType.BOOKING })
  type!: OrderType;

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

  @Prop({ required: true, type: OrderContact })
  @Type(() => OrderContact)
  @IsNotEmpty({ message: 'ORDER_CONTACT_REQUIRED' })
  @ValidateNested()
  @ApiProperty({ type: OrderContact })
  contact!: OrderContact;

  @Prop({ type: Date, required: true }, PropType.ARRAY)
  @IsNotEmpty({ message: 'BOOKING_TIME_REQUIRED' })
  @IsArray({ message: 'BOOKING_TIME_INVALID' })
  @ApiProperty({ isArray: true })
  bookingTime!: Date[];

  @Prop({ type: Date, default: null })
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'CHECKIN_TIME_INVALID' })
  @ApiPropertyOptional()
  checkinTime?: Date;

  @Prop({ type: Date, default: null })
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'CHECKOUT_TIME_INVALID' })
  @ApiPropertyOptional()
  checkoutTime?: Date;

  @Prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Busy' })
  cancelReason?: string;

  @Prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Out of service' })
  rejectReason?: string;

  @Prop({ required: true, enum: PaymentMethod, default: PaymentMethod.COD })
  @IsNotEmpty({ message: 'PAYMENT_METHOD_REQUIRED' })
  @IsEnum(PaymentMethod, { message: 'PAYMENT_METHOD_INVALID' })
  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.COD })
  paymentMethod!: PaymentMethod;

  @Prop({ required: true, default: 0 })
  @IsOptional()
  @ApiProperty({ example: 500000 })
  serviceFee!: number;

  @Prop({ required: true, ref: () => Room })
  @Type(() => String)
  @IsNotEmpty({ message: 'ROOM_ID_REQUIRED', groups: [ValidateGroup.HOOK] })
  @ApiProperty({ type: String })
  roomId!: Ref<Room, string>;

  @Prop({ required: true, ref: () => User })
  @Type(() => String)
  @IsNotEmpty({ message: 'USER_ID_REQUIRED' })
  @ApiProperty({ type: String })
  userId!: Ref<User, string>;

  @Prop({ type: () => OrderTimeline, required: true, default: [] }, PropType.ARRAY)
  @Type(() => OrderTimeline)
  @IsNotEmpty({ message: 'ORDER_TIMELINE_REQUIRED' })
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ type: OrderTimeline, isArray: true })
  timelines!: OrderTimeline[];

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  @IsNotEmpty({ message: 'ORDER_STATUS_REQUIRED' })
  @IsEnum(OrderStatus, { message: 'ORDER_STATUS_INVALID' })
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING })
  status!: OrderStatus;

  // Virtual
  @Prop({ ref: () => Room, foreignField: '_id', localField: 'roomId', justOne: true })
  @Type(() => Room)
  @ApiPropertyOptional({ type: Room })
  room?: Ref<Room>;

  @Prop({ ref: () => User, foreignField: '_id', localField: 'userId', justOne: true })
  @Type(() => User)
  @ApiPropertyOptional({ type: User })
  user?: Ref<User>;
}
