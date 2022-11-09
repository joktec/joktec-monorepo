import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../source.constants';

export type SourceDocument = Source & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Source {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: string;
  @Prop({ type: String, required: true })
  name: String;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
