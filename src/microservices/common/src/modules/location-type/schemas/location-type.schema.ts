import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../location-type.constants';

export type LocationTypeDocument = LocationType & CustomMongooseDocument;

@Schema({ collection: NAME })
export class LocationType {
  @Prop({
    type: String,
  })
  type: string;

  @Prop({ type: Number })
  level: number;

  @Prop({
    type: String,
  })
  country: string;
}

export const LocationTypeSchema = SchemaFactory.createForClass(LocationType);
