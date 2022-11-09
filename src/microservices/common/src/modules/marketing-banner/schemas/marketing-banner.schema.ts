import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { COLLECTION_NAME } from '../marketing-banner.constants';

export type MarketingBannerDocument = MarketingBanner & CustomMongooseDocument;

@Schema({ collection: COLLECTION_NAME })
export class MarketingBanner {
  @Prop({
    type: String,
    required: true,
  })
  file: String;
  @Prop({
    type: String,
    default: 'en',
  })
  lang: String;
  @Prop()
  redirectLink: String;
  @Prop()
  bannerType: String;
  @Prop()
  bannerPosition: String;
  @Prop()
  marketingLocation: String;
  @Prop()
  page: String;
  @Prop()
  validFrom: Date;
  @Prop()
  validUntil: Date;
  @Prop({
    type: Number,
    default: 0,
  })
  active: Number;
  @Prop({
    type: Number,
    default: 0,
  })
  isTest: Number;
}

export const MarketingBannerSchema = SchemaFactory.createForClass(MarketingBanner);
