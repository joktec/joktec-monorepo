import { Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../../base/base.schema';
import { IsCdnUrl } from '../../utils';
import { OrderStatus, OrderType, PaymentMethod } from '../constants';
import { OrderContact } from './order-contact';
import { OrderTimeline } from './order-timeline';
import { Room } from './room';
import { User } from './user';

@Schema({ collection: 'orders', textSearch: 'title,subhead', paranoid: true })
export class Order extends BaseSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  code!: string;

  @Prop({ required: true })
  sequence!: number;

  @Prop({ required: true })
  title!: string;

  @Prop({ type: String, default: null })
  subhead?: string;

  @Prop({ type: String, default: null })
  description?: string;

  @Prop({ required: true, enum: OrderType, default: OrderType.BOOKING })
  type!: OrderType;

  @Prop({ default: null })
  @IsCdnUrl()
  image?: string;

  @Prop({ default: null })
  @IsCdnUrl()
  thumbnail?: string;

  @Prop({ required: true, type: OrderContact })
  contact!: OrderContact;

  @Prop({ type: [Date], required: true }, PropType.ARRAY)
  bookingTime!: Date[];

  @Prop({ type: Date, default: null })
  checkinTime?: Date;

  @Prop({ type: Date, default: null })
  checkoutTime?: Date;

  @Prop({ default: null, example: 'Busy' })
  cancelReason?: string;

  @Prop({ default: null, example: 'Out of service' })
  rejectReason?: string;

  @Prop({ required: true, enum: PaymentMethod, default: PaymentMethod.COD })
  paymentMethod!: PaymentMethod;

  @Prop({ required: true, default: 0 })
  serviceFee!: number;

  @Prop({ type: String, required: true, ref: () => Room })
  roomId!: Ref<Room, string>;

  @Prop({ type: String, required: true, ref: () => User })
  userId!: Ref<User, string>;

  @Prop({ type: [OrderTimeline], required: true, default: [] })
  timelines!: OrderTimeline[];

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  // Virtual
  @Prop({ type: Room, ref: () => Room, foreignField: '_id', localField: 'roomId', justOne: true })
  room?: Ref<Room>;

  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'userId', justOne: true })
  user?: Ref<User>;
}
