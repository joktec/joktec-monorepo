import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../university.constants';

export type UniversityDocument = University & CustomMongooseDocument;

@Schema({ collection: NAME })
export class University {
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

export const UniversitySchema = SchemaFactory.createForClass(University);
