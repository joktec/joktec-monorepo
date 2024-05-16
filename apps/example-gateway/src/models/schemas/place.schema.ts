import { MongoSchema, Prop, Ref, Schema } from '@joktec/mongo';
import { PropType, Severity } from '@typegoose/typegoose';
import { PlaceType } from '../constants';
import { PlaceImageSchema } from './place-image.schema';

@Schema({ collection: 'places', unique: 'sourceId,socialId' })
export class PlaceSchema extends MongoSchema {
  static dtoName = 'Place';

  @Prop({ required: true, trim: true, immutable: true })
  sourceId!: string;

  @Prop({ required: true, trim: true, immutable: true })
  socialId!: string;

  @Prop({ default: null })
  sourceUrl?: string;

  @Prop({ default: '' })
  title!: string;

  @Prop({ required: true, enum: PlaceType, default: PlaceType.HOTEL })
  type!: PlaceType;

  @Prop({ required: false, allowMixed: Severity.ALLOW }, PropType.MAP)
  jsonData!: object;

  @Prop({ required: false })
  htmlData!: string;

  @Prop({ default: new Date() })
  lastSyncImage?: Date;

  @Prop({ default: new Date() })
  lastSyncReview?: Date;

  @Prop({ default: 0 })
  reviewRating?: number;

  @Prop({ default: 0 })
  reviewCount?: number;

  @Prop({
    type: [PlaceImageSchema],
    ref: () => PlaceImageSchema,
    foreignField: 'placeId',
    localField: '_id',
  })
  images?: Ref<PlaceImageSchema>[];
}
