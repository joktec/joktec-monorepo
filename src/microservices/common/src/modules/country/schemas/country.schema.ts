import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../country.constants';

export type CountryDocument = Country & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Country {
  @Prop({
    type: String,
    required: [true, 'Code is Required'],
    trim: true,
    lowercase: true,
  })
  code: String;
  @Prop({
    type: String,
    required: [true, 'Name is Required'],
  })
  name: String;
  @Prop()
  nameEng: String;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
