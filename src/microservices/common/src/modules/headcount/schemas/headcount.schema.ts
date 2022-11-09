import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type HeadcountDocument = Headcount & CustomMongooseDocument;

@Schema({ collection: 'headcount' })
export class Headcount {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  nameEn: string;

  @Prop({ type: Number })
  priority: number;
}

export const HeadcountSchema = SchemaFactory.createForClass(Headcount);
