import { Prop, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../../base/base.schema';
import { IsCdnUrl } from '../../utils';
import { ApartmentStatus, ApartmentType } from '../constants';
import { Location } from './location';
import { Room } from './room';
import { Setting } from './setting';

@Schema({
  collection: 'apartments',
  textSearch: 'title,subhead',
  geoSearch: 'location',
  paranoid: true,
  unique: 'code',
})
export class Apartment extends BaseSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  code!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ default: null })
  subhead?: string;

  @Prop({ default: null })
  description?: string;

  @Prop({ required: true, enum: ApartmentType, example: ApartmentType.HOTEL })
  type!: ApartmentType;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  image?: string;

  @Prop({ default: null })
  @IsCdnUrl()
  thumbnail?: string;

  @Prop({ type: [String], default: [], minSize: 2, example: ['https://example.com/image.png'] })
  @IsCdnUrl()
  gallery?: string[];

  @Prop({ default: 0, min: 0, minlength: 1 })
  order?: number;

  @Prop({ required: true, nested: true })
  location!: Location;

  @Prop({ type: [String], ref: () => Setting, default: [] })
  settingIds?: Ref<Setting, string>[];

  @Prop({ type: String, ref: () => Apartment, default: null })
  parentId?: Ref<Apartment, string>;

  @Prop({ required: true, enum: ApartmentStatus, example: ApartmentStatus.ACTIVATED })
  status!: ApartmentStatus;

  // Virtual
  @Prop({ type: Apartment, ref: () => Apartment, foreignField: '_id', localField: 'parentId', justOne: true })
  parent?: Ref<Apartment>;

  @Prop({
    type: [Apartment],
    ref: () => Apartment,
    foreignField: 'parentId',
    localField: '_id',
    strictRef: true,
    options: { sort: { order: 1 } },
  })
  children?: Ref<Apartment>[];

  @Prop({
    type: [Room],
    ref: () => Room,
    foreignField: 'apartmentId',
    localField: '_id',
    strictRef: true,
    options: { sort: { floor: 1, roomNumber: 1 } },
  })
  rooms?: Ref<Room>[];

  @Prop({
    type: [Setting],
    ref: () => Setting,
    foreignField: '_id',
    localField: 'settingIds',
    options: { sort: { order: 1 } },
  })
  areas?: Ref<Setting>[];
}
