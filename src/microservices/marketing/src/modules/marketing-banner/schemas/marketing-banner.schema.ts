import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type MarketingBannerDocument = MarketingBanner & CustomMongooseDocument;

@Schema({ collection: 'marketing_banner' })
export class MarketingBanner {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  file: string;

  @Prop()
  lang: string;

  @Prop()
  redirectLink: string;

  @Prop()
  bannerType: string;

  @Prop()
  bannerPosition: string;

  @Prop()
  marketingLocation: string;

  @Prop()
  page: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  validFrom: Date;

  @Prop()
  validUntil: Date;

  @Prop()
  active: number;

  @Prop()
  isTest: number;
}

export const MarketingBannerSchema =
  SchemaFactory.createForClass(MarketingBanner);
