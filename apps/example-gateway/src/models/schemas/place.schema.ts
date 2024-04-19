import { MongoSchema, Prop, Schema } from '@joktec/mongo';
import { PropType, Severity } from '@typegoose/typegoose';
import { PlaceType } from '../constants';

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
}
