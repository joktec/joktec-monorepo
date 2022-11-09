import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../banner.constants';

export type BannerDocument = Banner & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Banner {
  @Prop({
    type: String,
    required: true,
  })
  file: String;
  @Prop({
    type: String,
    default: 'vi',
  })
  lang: String;
  @Prop({
    type: Number,
    default: 0,
  })
  active: number;
  @Prop()
  fileMobil: String;
  @Prop()
  validFrom: Date;
  @Prop()
  validUntil: Date;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
