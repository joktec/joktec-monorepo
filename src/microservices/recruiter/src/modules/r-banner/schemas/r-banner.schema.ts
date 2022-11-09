import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RBannerDocument = RBanner & CustomMongooseDocument;

@Schema({ collection: 'r_banner' })
export class RBanner {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  file: string;

  @Prop()
  lang: string;

  @Prop()
  link: string;

  @Prop()
  position: string;

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
  description: string;
}

export const RBannerSchema = SchemaFactory.createForClass(RBanner);
