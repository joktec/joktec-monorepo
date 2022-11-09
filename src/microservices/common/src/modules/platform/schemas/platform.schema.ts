import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../platform.constants';

export type PlatformDocument = Platform & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Platform {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: String;
  @Prop({
    type: String,
    required: true,
  })
  name: String;
}

export const PlatformSchema = SchemaFactory.createForClass(Platform);
