import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../district.constants';

export type DistrictDocument = District & CustomMongooseDocument;

@Schema({ collection: NAME })
export class District {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: string;
  @Prop({ type: String, required: true })
  name: string;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
