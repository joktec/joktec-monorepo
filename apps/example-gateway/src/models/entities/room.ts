import { MongoSchema, Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../utils';
import { RoomStatus, RoomType } from '../constants';
import { Apartment } from './apartment';
import { RoomSchedule } from './room-schedule';
import { Setting } from './setting';

@Schema({ collection: 'rooms', textSearch: 'title,subhead', paranoid: true })
export class Room extends MongoSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  code!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ default: null })
  subhead?: string;

  @Prop({ default: null })
  description?: string;

  @Prop({ required: true, enum: RoomType })
  type!: RoomType;

  @Prop({ required: true, unsigned: true })
  floor!: number;

  @Prop({ required: true, unsigned: true })
  roomNumber!: number;

  @Prop({ required: true, unsigned: true })
  slot!: number;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  image?: string;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  thumbnail?: string;

  @Prop({ type: [String], default: [] }, PropType.ARRAY)
  @IsCdnUrl()
  gallery?: string[];

  @Prop({ default: 0, unsigned: true })
  order?: number;

  @Prop({ default: 0, unsigned: true })
  price!: number;

  @Prop({ type: String, required: true, ref: () => Apartment })
  apartmentId!: Ref<Apartment, string>;

  @Prop({ type: [String], required: true, ref: () => Setting, default: [] }, PropType.ARRAY)
  settingIds!: Ref<Setting, string>[];

  @Prop({ type: [RoomSchedule], required: true, default: [] }, PropType.ARRAY)
  schedules!: RoomSchedule[];

  @Prop({ required: true, enum: RoomStatus })
  status!: RoomStatus;

  // Virtual
  @Prop({ type: Apartment, ref: () => Apartment, foreignField: '_id', localField: 'apartmentId', justOne: true })
  apartment?: Ref<Apartment>;

  @Prop({ type: [Setting], ref: () => Setting, foreignField: '_id', localField: 'settingIds' })
  utilities?: Ref<Setting>[];
}
