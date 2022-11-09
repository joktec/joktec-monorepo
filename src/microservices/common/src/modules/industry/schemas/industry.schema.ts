import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../industry.constants';

export type IndustryDocument = Industry & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Industry {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: string;
  @Prop({
    type: String,
    required: true,
  })
  name: string;
  @Prop({
    type: String,
    required: true,
  })
  urlCode: string;
  @Prop()
  nameEng: string;
  @Prop()
  logo: string;
  @Prop()
  logoColor: string;
  @Prop()
  image: string;
  @Prop()
  imageHighlight: string;
  @Prop()
  hlLogo: string;
  @Prop()
  hlLogoColor: string;
  @Prop()
  hlImage: string;
  @Prop()
  hlImageHighlight: string;
  @Prop({
    type: Number,
    default: 0,
  })
  priority: number;
  @Prop({
    type: Number,
    default: 0,
  })
  platform: number;
  @Prop({
    type: Number,
    default: 0,
  })
  isTpActive: number;
  @Prop({
    type: Number,
    default: 0,
  })
  isFptoActive: number;
  @Prop({
    type: Number,
    default: 0,
  })
  priorityTop: number;
  @Prop({
    type: Number,
    default: 0,
  })
  isFptoTop: number;
  @Prop({
    type: Number,
    default: 0,
  })
  priorityFooter: number;
  @Prop({
    type: Number,
    default: 0,
  })
  priorityHighlight: number;
  @Prop({
    type: Number,
    default: 0,
  })
  priorityHighlightFpto: number;
}

export const IndustrySchema = SchemaFactory.createForClass(Industry);
