import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../setting.constants';

export type SettingDocument = Setting & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Setting {
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

export const SettingSchema = SchemaFactory.createForClass(Setting);
