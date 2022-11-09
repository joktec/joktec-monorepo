import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../city.constants';

export type CityDocument = City & CustomMongooseDocument;

@Schema({ collection: NAME })
export class City {
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
  @Prop()
  nameEng: string;
  @Prop({
    type: String,
    ref: 'Country',
  })
  country: string;
  @Prop({
    type: Number,
    default: 0,
  })
  priority: number;
  @Prop({
    type: Number,
    default: 0,
  })
  prioritySearch: number;
  @Prop({
    type: Number,
    default: 0,
  })
  enabled: number;
  @Prop({
    type: String,
    trim: true,
  })
  image: string;
  @Prop({
    type: String,
    trim: true,
  })
  imageHighlight: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
