import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type BenefitDocument = Benefit & CustomMongooseDocument;

@Schema({ collection: 'benefit' })
export class Benefit {
  @Prop({ type: String })
  code: string;

  @Prop({ type: String })
  createBy: string;

  @Prop({ type: Date })
  createDate: Date;

  @Prop({ type: Date })
  lastUpdate: Date;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  nameEng: string;

  @Prop({ type: Date })
  updateBy: Date;

  @Prop({ type: Number })
  priority: number;

  @Prop({ type: Number })
  enabled: number;

  @Prop({ type: String })
  image: string;
}

export const BenefitSchema = SchemaFactory.createForClass(Benefit);
