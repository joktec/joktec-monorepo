import { MongoSchema, Prop, Ref, Schema } from '@joktec/mongo';
import { PropType, Severity } from '@typegoose/typegoose';
import { PlaceSchema } from './place.schema';

@Schema({ collection: 'place_previews', unique: 'sourceId,socialId' })
export class PlaceReviewSchema extends MongoSchema {
  @Prop({ required: true, trim: true, immutable: true })
  sourceId!: string;

  @Prop({ required: true, trim: true, immutable: true })
  socialId!: string;

  @Prop({ default: null })
  sourceUrl?: string;

  @Prop({ default: '' })
  title!: string;

  @Prop({ required: false, allowMixed: Severity.ALLOW }, PropType.MAP)
  jsonData!: object;

  @Prop({ required: false })
  htmlData!: string;

  @Prop({ type: String, ref: () => PlaceSchema, default: null })
  placeId?: Ref<PlaceSchema, string>;
}
